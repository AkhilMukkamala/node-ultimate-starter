const Users = require('../models/Users');
const UsersMeta = require('../models/UsersMeta');
const UsersSession = require('../models/UsersSession');


const createUser = async (user) => {
    return await Users.create(user);
};

const getAllUsers = async () => {
    return await Users.find({}, {
        createdAt: 0,
        updatedAt: 0,
        password: 0
    }).exec();
};

const getUserById = async (_id) => {
    return await Users.findById(
        _id, {
            createdAt: 0,
            updatedAt: 0,
            password: 0
        }).exec();
};

const getUserByEmail = async (email) => {
    return await Users.findOne({
        email
    }, {
        createdAt: 0,
        updatedAt: 0,
        password: 0
    }).exec();
};

// Users Meta

const getUserMetaByUserId = async (userId) => {
    return await UsersMeta.findOne({
        userId
    }, {
        createdAt: 0,
        updatedAt: 0
    }).exec();
};

const updateUsersMeta = async (userId, condition) => {
    return await UsersMeta.updateOne({ userId }, condition, { upsert: true, new: true }).exec();
}


// Sessions

const createUserSession = async (info) => {
    return await UsersSession.create(info);
}


module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.getUserByEmail = getUserByEmail;
module.exports.getUserMetaByUserId = getUserMetaByUserId;
module.exports.updateUsersMeta = updateUsersMeta;
module.exports.createUserSession = createUserSession;


// Complete Models
module.exports.Users = Users;
module.exports.UsersMeta = UsersMeta;
module.exports.UsersSession = UsersSession;
module.exports.createUser = createUser;
