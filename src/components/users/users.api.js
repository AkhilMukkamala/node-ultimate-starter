const router = require('express').Router();

// Internal Files
const log = require("../../shared/services/logger.service");


const UsersService = require('./users.service');



router.get('/test', async (req, res) => {
    return res.status(200).json({
        message: "application running"
    })

});


router.get('/parse', async (req, res) => {
    return res.status(200).json({
        ip: req.clientIp,
        clientAddress: req.clientAddress,
        ua: req.useragent
    })

});

router.get('/user', async (req, res) => {
    let { _id } = req.query;
    let result = await UsersService.retrieveUserById(_id);
    return res.status(200).json(result);
});

router.get('/settings', async (req, res) => {
    let { userId } = req.query;
    let result = await UsersService.retrieveUserMeta(userId);
    return res.json(result);
});


router.get('/users', async (req, res) => {
    // check whether he has admin permission to retrieve all the users.
});


module.exports = router;
