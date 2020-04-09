const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true,
            trim: true
        },
        fullName: {
            type: String,
            trim: true,
            required: true,
            match: /[a-zA-Z]+/
        },
        companyName: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["SUPER-ADMIN", "ADMIN", "MEMBER"],
            default: 'ADMIN'
        },
        isActive: {
            type: Boolean,
            default: true,
            required: false
        },
        isPremium: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        strict: false,
        versionKey: false
    }
);

let User = mongoose.model('User', UserSchema, 'users');
module.exports = User;
