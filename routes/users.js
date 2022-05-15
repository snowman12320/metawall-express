const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const { checkAuth, generateSendJWT } = require('../service/auth');

// router.get('', function(req, res, next) {
//     /**
//      * #swagger.tags = ['Users']
//      * #swagger.description = '取得全部 user'
//      * #swagger.responses[200] = {
//             description: 'user 資訊',
//             schema: {
//                 status: 'success',
//                 message: '取得成功',
//                 data: [{
//                     _id: '626c14b5fdb48b9d205ef262',
//                     name: '王小明',
//                     photo: 'aaa.jpg'
//                 }]
//             }
//         }
//      */
//     users.getData(req, res, next);
// });

router.post('/register', (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '註冊'
     * #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            required: true,
            description: '資料格式',
            schema: {
                $name: '王小明',
                $email: '123@gmail.com',
                $password: '12345678',
                $confirmPassword: '12345678'
            }
        }
     * #swagger.responses[200] = {
            description: '註冊資訊',
            schema: {
                status: 'success',
                message: '註冊成功，請重新登入',
                data: {}
            }
        }
     */
    users.register(req, res, next);
});

router.post('/login', (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '登入'
     * #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            required: true,
            description: '資料格式',
            schema: {
                $email: '123@gmail.com',
                $password: '12345678'
            }
        }
     * #swagger.responses[200] = {
            description: '登入資訊',
            schema: {
                status: 'success',
                message: '登入成功',
                data: {
                    token: 'eiguligulguihhg',
                    profile: {
                        name: '王小明',
                        photo: ''
                    }
                }
            }
        }
     */
    users.login(req, res, next);
});

router.get('/profile', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '取得登入者個人資訊'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.responses[200] = {
            description: 'user 資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: {
                    _id: '79868070201',
                    name: '王小明',
                    photo: '',
                    gender: 'male'
                }
            }
        }
     */
    users.getOwnProfile(req, res, next);
});

router.get('/profile/:name', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '查看其他用戶資訊'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.parameters['name'] = {
            in: 'path',
            type: 'string',
            required: true,
            description: '用戶姓名'
        }
     * #swagger.responses[200] = {
            description: 'user 資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: {
                    name: '王小明',
                    photo: ''
                }
            }
        }
     */
    users.getProfileByName(req, res, next);
});

router.patch('/profile', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '編輯登入者個人資訊'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            required: true,
            description: '資料格式',
            schema: {
                $name: '王小明',
                photo: '',
                gender: 'female'
            }
        }
     * #swagger.responses[200] = {
            description: 'user 資訊',
            schema: {
                status: 'success',
                message: '更新成功',
                data: {
                    _id: '79868070201',
                    name: '王小明',
                    photo: '',
                    gender: 'female'
                }
            }
        }
     */
    users.patchProfile(req, res, next);
});

router.patch('/update_password', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '編輯登入者密碼'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            required: true,
            description: '資料格式',
            schema: {
                $password: '11223344',
                $confirmPassword: '11223344'
            }
        }
     * #swagger.responses[200] = {
            description: 'user 資訊',
            schema: {
                status: 'success',
                message: '更新成功',
                data: {
                    token: 'eiguligulguihhg',
                    profile: {
                        name: '王小明',
                        photo: ''
                    }
                }
            }
        }
     */
    users.updatePassword(req, res, next);
});

module.exports = router;