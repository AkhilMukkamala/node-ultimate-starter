// Library
const uid = require('shortid');
uid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

// Files
const sendMail = require('./mailer.service').sendMail;

let formatResponse = (success, json) => {

    let message = json.message;
    if ((success === false) && (json.error !== null)) {
        // Error Obj
        let error = String(json.error);
        // Send mail to alert the admin!
        sendMail({subject: `${process.env.APPNAME} Application Error`, text: `The Error Message is: ${message}`, html: `The error is: ${error}` });
        return { success, message: message, error: error };
    } else {
        return { success, message: message, data: json.data };
    }
}


let generateReferralCode = () => {
    return uid.generate();
}

module.exports.formatResponse = formatResponse;
module.exports.generateReferralCode = generateReferralCode;
