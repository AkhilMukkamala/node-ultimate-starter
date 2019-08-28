// Libraries
const router = require('express').Router();

//  Internal Files!
const log = require('./../../shared/services/logger.service');

const AuthService = require('./authentication.service');


router.post('/signup', async (req, res) => {
    let { name, email, password } = req.body;
    let result = await AuthService.signUp(name, email, password);
    return res.json(result);
});

router.post('/signin', async (req, res) => {
    let { email, password } = req.body;
    let result = await AuthService.signIn(email, password, req.clientIp, req.clientAddress, req.useragent);
    return res.json(result);
});

router.get('/verify-gauth', async (req, res) => {
    let { _id, token } = req.query;
    let result = await AuthService.verifyGAuth(_id, token, req.clientIp, req.clientAddress, req.useragent);
    return res.json(result);
});

router.get('/qr-gauth', async (req, res) => {
    let { _id } = req.query;
    let result = await AuthService.getQrGAuth(_id);
    if (!(result.success)) {
        return res.json(result);
    } else {
        return res.send(`<img src=${result.data.qr} />`);
    }
});

router.get('/setup-gauth', async (req, res) => {
    let { _id } = req.query;
    let result = await AuthService.setupGAuth(_id);
    if (!result.success) {
        return res.json(result);
    } else {
        return res.send(`<img src=${result.data.qr} />`);
    }
});

router.post('/change-password', async (req, res) => {
    let { _id, oldPassword, newPassword, confirmPassword } = req.body;
    let result = await AuthService.changePassword(_id, oldPassword, newPassword, confirmPassword);
    return res.json(result);
});

router.get('/email-verification/:token', async (req, res) => {
    let { token } = req.params;
    let result = await AuthService.checkEmailVerificationStatus(token);
    if (result.success && result.message === 'REDIRECT-TRUE') {
        // TODO - Change the redirect URL.
        return res.redirect(process.env.REDIRECT_URL);
    } else {
        return res.json(result);
    }
});

router.get('/resend-email', async (req, res) => {
    let { _id } = req.query;
    let result = await AuthService.sendVerificationEmail(_id);
    return res.json(result);
});

router.post('/reset-password', async (req, res) => {
    let { _id, newPassword, confirmPassword } = req.body;
    let result = await AuthService.resetPassword(_id, newPassword, confirmPassword);
    return res.json(result);
});

router.post('/reset-password-mail', async (req, res) => {
    let { email } = req.body;
    let result = await AuthService.sendPasswordResetEmail(email);
    return res.json(result);
});

router.get('/reset-password/:token', async (req, res) => {
    let { token } = req.params;
    let result = await AuthService.checkPasswordResetStatus(token);
    if (result.success && result.message === 'REDIRECT-TRUE') {
        // TODO - Change the redirect URL.
        return res.redirect(process.env.REDIRECT_URL);
    } else {
        return res.json(result);
    }
})


module.exports = router;
