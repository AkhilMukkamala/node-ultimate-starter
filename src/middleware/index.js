let jwt = require('jsonwebtoken');
let msg = require('../config/msg.config');

let verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            success: false,
            message: msg["unauthorized-request"]
        })
    } else {
        let token = req.headers.authorization.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
                if (err || !result) {
                    let httpStatus = err ? 500 : 401;
                    return res.status(httpStatus).json({
                        success: false,
                        message: err.message || msg["unauthorized-request"]
                    })
                } else {
                    req.user = result;
                    next();
                }
            })
        } else {
            return res.status(401).json({
                success: false,
                message: msg["unauthorized-request"]
            })
        }
    }
}

module.exports.verifyToken = verifyToken;
