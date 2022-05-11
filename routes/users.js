const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const { checkAuth, generateSendJWT } = require('../service/auth');

router.post('/register', (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '取得全部 user'
     * #swagger.responses[200] = {
            description: 'user 資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: [{
                    _id: '626c14b5fdb48b9d205ef262',
                    name: '王小明',
                    photo: 'aaa.jpg'
                }]
            }
        }
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
    users.getProfile(req, res, next);
});

router.get('/update-password', checkAuth, (req, res, next) => {
    users.updatePassword(req, res, next);
});

module.exports = router;