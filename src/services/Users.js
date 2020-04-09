// Library

// Internal Files
const Constants = require("../constants");
const logger = require("../services/Logger");
const Utils = require("../services/Utils");

const usersDAL = require('../dal/Users');


const retrieveUserById = async (_id) => {
    try {
        const user = await usersDAL.getUserById(_id);
        return Utils.formatResponse(true, {
            data: user,
            message: Constants["data-retrieved"]
        });
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants["sorry-something-went-wrong"],
            error: error
        });
    }
};


const retrieveUserByEmail = async (email) => {
    try {
        const user = await usersDAL.getUserByEmail(email);
        return Utils.formatResponse(true, {
            data: user,
            message: Constants["data-retrieved"]
        });
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants["something-went-wrong"],
            error: error
        });
    }
}

const retrieveUserMeta = async (userId) => {
    try {
        const settings = usersDAL.getUserMetaByUserId(userId);
        return Utils.formatResponse(true, {
            data: settings,
            message: Constants["data-retrieved"]
        });
    } catch (error) {
        return Utils.formatResponse(false, {
            message: Constants["something-went-wrong"],
            error: error
        });
    }
}


module.exports.retrieveUserById = retrieveUserById;
module.exports.retrieveUserByEmail = retrieveUserByEmail;
module.exports.retrieveUserMeta = retrieveUserMeta;
