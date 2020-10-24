const router = require('express').Router();
const Constants = require('../../constants');

router.get('/', (req, res) => {
    return res.status(200).json({
        message: Constants.APP_RUNNING
    });
});


module.exports = router;
