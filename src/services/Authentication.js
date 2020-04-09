const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomBytes, createHash } = require('crypto');
const Ajv = require('ajv');
const ajv = new Ajv({
    $data: true
});

const speakeasy = require('speakeasy');
const qrCode = require('qrcode');

//  Custom Files
const Constants = require('../constants');
const MailerService = require('./Mailer');
const Utils = require('./Utils');

const usersDAL = require('../dal/Users');

// Email Templates
const emailTemplates = require('../emailTemplates/Templates');

// Services

let signUp = async (name, email, password) => {
    try {
        const valid = ajv.validate(signUpSchema, {
            name,
            email,
            password
        });
        if (!valid) {
            return Utils.formatResponse(false, {
                message: Constants['required-fields-missing'],
                error: JSON.stringify(ajv.errors[0])
            });
        } else {
            // Check User If Already Registered
            const isUserRegistered = await usersDAL.getUserByEmail(email);

            if (isUserRegistered) {
                return Utils.formatResponse(false, {
                    message: Constants['user-registered']
                });
            } else {
                const hashedPassword = await generatePasswordHash(password);

                //  Save User
                const user = await usersDAL.createUser({
                    name,
                    email,
                    password: hashedPassword
                });

                // Send Welcome Email
                commonEmailTemplate(email, name, email, `Welcome to ${process.env.APPNAME}`, Constants['welcome-email']);

                //  Send Verification Email
                await sendVerificationEmail(user._id);

                return Utils.formatResponse(true, {
                    message: Constants['user-registration-success']
                });
            }
        }
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};

let signIn = async (email, password, ip, address, useragent) => {
    try {
        // Schema Validation
        const valid = ajv.validate(signInSchema, {
            email,
            password
        });

        if (!valid) {
            return Utils.formatResponse(false, {
                message: Constants['required-fields-missing'],
                error: JSON.stringify(ajv.errors[0])
            });
        } else {
            // Check If Email Exists or Not.
            const isUserRegistered = await Users.findOne({
                email
            }, {
                password: 1
            }).exec();

            if (!isUserRegistered) {
                return Utils.formatResponse(false, {
                    message: Constants['user-not-registered']
                });
            } else {
                const userPassword = isUserRegistered.password;
                const userId = isUserRegistered._id;

                const isPasswordCorrect = await argon2.verify(
                    userPassword,
                    password
                );

                if (!isPasswordCorrect) {
                    return Utils.formatResponse(false, {
                        message: Constants['incorrect-password']
                    });
                } else {
                    // Check if 2FA Enabled!
                    const is2FAEnabled = await usersDAL.getUserMetaByUserId(userId)

                    if (is2FAEnabled && is2FAEnabled.security.twoFactor.gAuth.enabled) {
                        return Utils.formatResponse(true, {
                            message: Constants['twofactor-enabled']
                        });
                    } else {
                        // Generate JWT
                        // Frontend should send '_id' everytime via an API Call, To get user details. (Security Measure!)
                        const token = generateJWT({
                            user: userId
                        });
                        await saveUserSession(userId, ip, address, useragent);
                        return Utils.formatResponse(true, {
                            message: Constants['twofactor-disabled'],
                            data: {
                                token
                            }
                        });
                    }
                }
            }
        }
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};

let saveUserSession = async (userId, ip, address, useragent) => {
    await usersDAL.createUserSession({
        userId: userId,
        ip: ip,
        useragent: useragent,
        address: address
    });
    return true;
};


let generateJWT = user => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '3h'
    });
};

let getQrGAuth = async userId => {
    try {
        if (!userId) {
            return Utils.formatResponse(false, {
                message: Constants['required-fields-missing'],
                error: null
            });
        } else {
            const is2FAEnabled = await usersDAL.getUserMetaByUserId(userId);

            const gAuthenticator = is2FAEnabled.security.twoFactor.gAuth.data;
            if (gAuthenticator) {
                const qr = await qrCode.toDataURL(gAuthenticator.otpauth_url);
                const response = { qr };
                return Utils.formatResponse(true, {
                    message: Constants['qr-retrieved'],
                    data: response
                });
            } else {
                return Utils.formatResponse(false, {
                    message: Constants['2fa-disabled']
                });
            }
        }
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};

let setupGAuth = async _id => {
    try {
        if (!_id) {
            return Utils.formatResponse(false, {
                message: Constants['required-fields-missing'],
                error: null
            });
        } else {
            const isUser = await usersDAL.getUserById(_id)
            if (!isUser) {
                return Utils.formatResponse(false, {
                    message: Constants['user-not-found']
                });
            } else {
                const secret = speakeasy.generateSecret({
                    length: 30
                });
                const updateGAuthData = await usersDAL.updateUsersMeta(_id, {
                    'security.twoFactor.gAuth.data': secret,
                    'security.twoFactor.gAuth.enabled': true
                });

                const qr = await qrCode.toDataURL(secret.otpauth_url);
                let response = {
                    qr: qr,
                    base32: secret.base32
                };
                return Utils.formatResponse(true, {
                    message: Constants['qr-generated'],
                    data: response
                });
            }
        }
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};

let verifyGAuth = async (userId, token, ip, address, useragent) => {
    try {
        const gAuthData = await usersDAL.getUserMetaByUserId(userId);

        if (gAuthData && gAuthData.security.twoFactor.gAuth.enabled) {
            const isOTPCorrect = speakeasy.totp.verify({
                secret: gAuthData.security.twoFactor.gAuth.data.base32,
                encoding: 'base32',
                token: token,
                window: 3
            });
            if (isOTPCorrect) {
                // Generate JWT
                // Frontend should send '_id' everytime via an API Call, To get user details. (Security Measure!)
                const token = generateJWT({
                    user: userId
                });
                await saveUserSession(userId, ip, address, useragent);
                return Utils.formatResponse(true, {
                    message: Constants['twofactor-success'],
                    data: {
                        token
                    }
                });
            } else {
                return Utils.formatResponse(false, {
                    message: Constants['twofactor-failed']
                });
            }
        } else {
            return Utils.formatResponse(false, {
                message: Constants['user-not-found-or-2fa-disabled'],
                error: null
            });
        }
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};

let changePassword = async (_id, oldPassword, newPassword, confirmPassword) => {
    try {
        const valid = ajv.validate(changePasswordSchema, {
            _id,
            oldPassword,
            newPassword,
            confirmPassword
        });

        if (!valid) {
            return Utils.formatResponse(false, {
                message: Constants['required-fields-missing'],
                error: JSON.stringify(ajv.errors[0])
            });
        } else {
            const isUserExist = await Users.findById(_id, {
                password: 1
            }).exec();

            if (!isUserExist) {
                return Utils.formatResponse(false, {
                    message: Constants['user-not-found']
                });
            } else {
                const userPassword = isUserExist.password;

                const isPasswordCorrect = await argon2.verify(
                    userPassword,
                    oldPassword
                );

                if (!isPasswordCorrect) {
                    return Utils.formatResponse(false, {
                        message: Constants['incorrect-old-password']
                    });
                } else {
                    const hashedPassword = await generatePasswordHash(newPassword);

                    //  Update New Password
                    let updatedPassword = await Users.updateOne({
                        _id
                    }, {
                        $set: {
                            password: hashedPassword
                        }
                    }, {
                        new: true
                    }).exec();

                    return Utils.formatResponse(true, {
                        message: Constants['password-updated']
                    });
                }
            }
        }
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};

let generatePasswordHash = async password => {
    //  Generate Salt
    const salt = await bcrypt.genSalt(Constants.PASSWORD_SALT_LENGTH);
    return await bcrypt.hash(password, salt)
};

let sendVerificationEmail = async (_id) => {
    try {
        // Get User!
        let user = await usersDAL.getUserById(_id);

        // Generate Email Verification Link

        let randomToken = randomBytes(32).toString('hex');
        randomToken = createHash('sha1').update(randomToken + _id).digest('hex');

        let updateEmailVerificationTkn = await usersDAL.updateUsersMeta(_id, {
            'isEmailSent': true,
            'tokens.emailVerification': randomToken
        });

        let url = `${process.env.DOMAIN_V1}` + '/email-verification/' + `${randomToken}`;

        // Send Verification Email
        commonEmailTemplate(user.email, user.name, user.email, `Welcome to ${process.env.APPNAME}`, Constants['account-verification-email'], url, 'VERIFY EMAIL');
        return Utils.formatResponse(true, {
            message: Constants['email-sent']
        });
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};

let checkEmailVerificationStatus = async (token) => {
    try {
        let query = await UsersMeta.findOne({
            'tokens.emailVerification': token
        }, {
            'tokens': 1
        }).exec();

        if (query) {
            await UsersMeta.findOneAndUpdate({
                'tokens.emailVerification': token
            }, {
                isEmailSent: true
            }, {
                new: true
            }).exec();
            return Utils.formatResponse(true, {
                message: Constants['redirect-true']
            });
        } else {
            return Utils.formatResponse(false, {
                message: Constants['redirect-false'],
                error: null
            });
        }
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};

let sendPasswordResetEmail = async (email) => {
    try {
        let isUser = await Users.findOne({
            email
        }).exec();

        if (!isUser) {
            return Utils.formatResponse(false, {
                message: Constants['user-not-found'],
                error: null
            });
        } else {
            // ** Always Upsert this!
            // ! Don't remove the upsert.
            let randomToken = randomBytes(32).toString('hex');
            randomToken = createHash('sha1').update(randomToken + isUser._id).digest('hex');

            await UsersMeta.findOneAndUpdate({
                userId: isUser._id
            }, {
                'tokens.passwordReset': randomToken,
                'tokens.passwordResetExpires': Date.now() + 86400000
            }, {
                upsert: true,
                new: true
            });

            let url = `${process.env.DOMAIN_V1}` + '/reset-password/' + `${randomToken}`;

            // Send Password Reset Email
            commonEmailTemplate(isUser.email, isUser.name, isUser.email, `Password reset request to ${process.env.APPNAME}`, Constants['reset-password-email'], url, 'RESET PASSWORD');
            return Utils.formatResponse(true, {
                message: Constants['email-sent']
            });
        }
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};

let checkPasswordResetStatus = async (token) => {
    try {
        let query = await UsersMeta.findOne({
            'tokens.passwordReset': token,
            'tokens.passwordResetExpires': {
                $gt: Date.now()
            }
        }, {
            'tokens': 1
        }).exec();

        if (query) {
            // commonEmailTemplate()
            return Utils.formatResponse(true, {
                message: Constants['redirect-true']
            });
        } else {
            return Utils.formatResponse(false, {
                message: Constants['redirect-false'],
                error: null
            });
        }
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};

let resetPassword = async (_id, newPassword, confirmPassword) => {
    try {
        const valid = ajv.validate(resetPasswordSchema, {
            _id,
            newPassword,
            confirmPassword
        });

        if (!valid) {
            return Utils.formatResponse(false, {
                message: Constants['required-fields-missing'],
                error: JSON.stringify(ajv.errors[0])
            });
        } else {
            const isUserExist = await Users.findById(_id).exec();

            if (!isUserExist) {
                return Utils.formatResponse(false, {
                    message: Constants['user-not-found']
                });
            } else {
                const hashedPassword = await generatePasswordHash(newPassword);

                const user = isUserExist;

                //  Update New Password
                let updatedPassword = await Users.updateOne({
                    _id
                }, {
                    $set: {
                        password: hashedPassword
                    }
                }, {
                    new: true
                }).exec();

                commonEmailTemplate(user.email, user.name, user.email, `Password Changed`, Constants['password-updated']);

                return Utils.formatResponse(true, {
                    message: Constants['password-updated']
                });
            }
        }
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants['something-went-wrong'],
            error: error
        });
    }
};



// Mailers

let commonEmailTemplate = (email, title, subtitle, subject, message, url, buttonName) => {
    let args = {
        from: process.env.APPNAME,
        to: email,
        subject: subject,
        html: emailTemplates.commonTemplate(title, subtitle, message, url, buttonName)
    };
    return MailerService.customMail(args);
};


module.exports.signUp = signUp;
module.exports.signIn = signIn;
module.exports.generateJWT = generateJWT;
module.exports.setupGAuth = setupGAuth;
module.exports.verifyGAuth = verifyGAuth;
module.exports.getQrGAuth = getQrGAuth;
module.exports.changePassword = changePassword;
module.exports.sendVerificationEmail = sendVerificationEmail;
module.exports.checkEmailVerificationStatus = checkEmailVerificationStatus;
module.exports.sendPasswordResetEmail = sendPasswordResetEmail;
module.exports.checkPasswordResetStatus = checkPasswordResetStatus;
module.exports.resetPassword = resetPassword;
module.exports.saveUserSession = saveUserSession;


// Validations

let checkUserSchema = {
    type: 'object',
    required: ['email'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            maxLength: 256
        }
    },
    additionalProperties: false
};

let signUpSchema = {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
        name: {
            type: 'string',
            minLength: 6
        },
        email: {
            type: 'string',
            format: 'email',
            maxLength: 256
        },
        password: {
            type: 'string',
            minLength: 6
        }
    },
    additionalProperties: false
};

let signInSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            maxLength: 256
        },
        password: {
            type: 'string',
            minLength: 6
        }
    },
    additionalProperties: false
};

let changePasswordSchema = {
    type: 'object',
    required: ['_id', 'oldPassword', 'newPassword', 'confirmPassword'],
    properties: {
        _id: {
            type: 'string'
        },
        oldPassword: {
            type: 'string',
            minLength: 6
        },
        newPassword: {
            type: 'string',
            minLength: 6
        },
        confirmPassword: {
            const: {
                '$data': '1/newPassword'
            }
        }
    },
    additionalProperties: false
};

let resetPasswordSchema = {
    type: 'object',
    required: ['_id', 'newPassword', 'confirmPassword'],
    properties: {
        _id: {
            type: 'string'
        },
        newPassword: {
            type: 'string',
            minLength: 6
        },
        confirmPassword: {
            const: {
                '$data': '1/newPassword'
            }
        }
    },
    additionalProperties: false
};
