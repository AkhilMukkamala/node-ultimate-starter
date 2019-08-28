const mongoose = require('mongoose');

let UserReferralSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        referralCode: {
            type: String,
            required: true
        },
        referredBy: {
            type: String
        },
        referredTo: [{
            email: String,
            phone: String,
            status: String
        }]
    },
    {
        timestamps: true,
        strict: false,
        versionKey: false
    }
);

let UserReferral = mongoose.model('UserReferral', UserReferralSchema, 'users.referrals');
module.exports = UserReferral;
