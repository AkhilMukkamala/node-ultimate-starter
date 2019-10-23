// Library

// Internal Files
const msg = require("./../../config/msg.config");
const log = require("./../../shared/services/logger.service");
const CommonService = require("./../../shared/services/common.service");

const usersDAL = require('./users.dal');


const retrieveUserById = async (_id) => {
    try {
        const user = await usersDAL.getUserById(_id);
        return CommonService.formatResponse(true, {
            data: user,
            message: msg["data-retrieved"]
        });
    } catch (error) {
        log('error', `${error}`)
        return CommonService.formatResponse(false, {
            message: msg["sorry-something-went-wrong"],
            error: error
        });
    }
};


const retrieveUserByEmail = async (email) => {
    try {
        const user = await usersDAL.getUserByEmail(email);
        return CommonService.formatResponse(true, {
            data: user,
            message: msg["data-retrieved"]
        });
    } catch (error) {
        log('error', `${error}`)
        return CommonService.formatResponse(false, {
            message: msg["something-went-wrong"],
            error: error
        });
    }
}

const retrieveUserMeta = async (userId) => {
    try {
        const settings = usersDAL.getUserMetaByUserId(userId);
        return CommonService.formatResponse(true, {
            data: settings,
            message: msg["data-retrieved"]
        });
    } catch (error) {
        log('error', `${error}`)
        return CommonService.formatResponse(false, {
            message: msg["something-went-wrong"],
            error: error
        });
    }
}


module.exports.retrieveUserById = retrieveUserById;
module.exports.retrieveUserByEmail = retrieveUserByEmail;
module.exports.retrieveUserMeta = retrieveUserMeta;
