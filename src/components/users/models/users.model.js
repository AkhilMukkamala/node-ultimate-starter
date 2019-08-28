const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            trim: true,
            match: /[a-zA-Z]+/
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'developer'
        },
        isActive: {
            type: Boolean,
            default: true,
            required: false
        },
        isPremium: {
            type: Boolean,
            default: false,
            required: false
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
