const mongoose = require('mongoose');

let UserMetaSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        security: {
            twoFactor: {
                mobile: {
                    enabled: Boolean
                },
                email: {
                    enabled: Boolean,
                    data: {
                        type: Number
                    }
                },
                gAuth: {
                    enabled: Boolean,
                    data: {
                        type: Object
                    }
                }
            },
        },
        preferences: {
            theme: String
        },
        notifications: {
            login: Boolean,
            subscription: Boolean,
            promotions: Boolean
        },
        tokens: {
            isEmailVerified: Boolean,
            isEmailSent: Boolean,
            passwordReset: String,
            passwordResetExpires: Date,
            emailVerification: String
        }
    },
    {
        timestamps: true,
        strict: false,
        versionKey: false
    }
);


let UserMeta = mongoose.model('UserMeta', UserMetaSchema, 'users.meta');
module.exports = UserMeta;
