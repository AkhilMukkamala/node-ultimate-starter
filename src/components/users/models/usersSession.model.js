const mongoose = require('mongoose');

let UserSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        ip: String,
        useragent: Object,
        address: {
            city: String,
            region: String,
            country: String,
            timezone: String,
            coordinates: {
                lat: String,
                long: String
            }
        }
    },
    {
        timestamps: true,
        strict: false,
        versionKey: false
    }
);

let UserSession = mongoose.model('UserSession', UserSessionSchema, 'users.sessions');
module.exports = UserSession;

