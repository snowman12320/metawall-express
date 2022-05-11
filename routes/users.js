const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const { checkAuth, generateSendJWT } = require('../service/auth');

router.post('/register', (req, res, next) => {
    /**
     * #swagger.ignore = true
     */
    users.register(req, res, next);
});

router.post('/login', (req, res, next) => {
    /**
     * #swagger.ignore = true
     */
    users.login(req, res, next);
});

router.get('/profile', checkAuth, (req, res, next) => {
    /**
     * #swagger.ignore = true
     */
    users.getProfile(req, res, next);
});

router.get('/update-password', checkAuth, (req, res, next) => {
    /**
     * #swagger.ignore = true
     */
    users.updatePassword(req, res, next);
});

module.exports = router;