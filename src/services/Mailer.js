// Libraries
const nodemailer = require('nodemailer');


// Internal


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    // service: 'gmail',
    auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS
    }
});

let sendMail = (args) => {
    let mailOptions = {
        from: process.env.MAIL_FROM_HEADER,
        to: process.env.MAIL_TO,
        cc: args.cc,
        subject: args.subject,
        text: args.message,
        html: args.html
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return;
            // return log('error', error);
        } else {
            return true;
        }
    });
  }

let customMail = (args) => {
    let mailOptions = {
        from: args.from,
        to: args.to,
        cc: args.cc,
        subject: args.subject,
        text: args.message,
        html: args.html
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // return log('error', error);
        } else {
            return true;
        }
    });
  }



  module.exports.customMail = customMail;
  module.exports.sendMail = sendMail;
