const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.post('/register', function(req, res, next) {
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

// login
router.post('/login', function(req, res, next) {
    /**
     * #swagger.ignore = true
     */
    users.login(req, res, next);
});

module.exports = router;