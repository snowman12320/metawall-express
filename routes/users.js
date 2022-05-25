const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const { checkAuth, generateSendJWT } = require('../service/auth');

// 註冊
router.post('/user/register', (req, res, next) => {
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

// 登入
router.post('/user/login', (req, res, next) => {
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
                        _id: '628a3f7bfd8374422f6af95e',
                        name: '王小明',
                        photo: ''
                    }
                }
            }
        }
     */
    users.login(req, res, next);
});

// 編輯自己的資訊
router.patch('/user/profile', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '編輯自己的資訊'
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
                gender: 'male'
            }
        }
     * #swagger.responses[200] = {
            description: '個人資訊',
            schema: {
                status: 'success',
                message: '更新成功',
                data: {
                    _id: '79868070201',
                    name: '王小明',
                    photo: '',
                    gender: 'male',
                    followers: [],
                    following: [],
                    createdAt: '2022-05-22T13:49:47.540Z'
                }
            }
        }
     */
    users.patchProfile(req, res, next);
});

// 編輯密碼
router.patch('/user/update_password', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '編輯密碼'
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
            description: 'token 資訊',
            schema: {
                status: 'success',
                message: '更新成功',
                data: {
                    token: 'eiguligulguihhg',
                    profile: {
                        _id: '628a3f7bfd8374422f6af95e',
                        name: '王小明',
                        photo: ''
                    }
                }
            }
        }
     */
    users.updatePassword(req, res, next);
});

// 取得自己的資訊
router.get('/user/profile', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '取得自己的資訊'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.responses[200] = {
            description: '個人資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: {
                    _id: '628a3f7bfd8374422f6af95e',
                    name: '王小明',
                    photo: '',
                    gender: 'male',
                    followers: [],
                    following: [],
                    createdAt: '2022-05-22T13:49:47.540Z'
                }
            }
        }
     */
    users.getOwnProfile(req, res, next);
});

// 取得其他用戶資訊
router.get('/user/profile/:id', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '取得其他用戶資訊'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.parameters['id'] = {
            in: 'path',
            type: 'string',
            required: true,
            description: '用戶id'
        }
     * #swagger.responses[200] = {
            description: '用戶資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: {
                    name: '漂亮阿姨',
                    photo: '',
                    followers: 10,
                    isFollow: true
                }
            }
        }
     */
    users.getProfileById(req, res, next);
});

// 取得所有按讚貼文
router.get('/user/likes', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '取得所有按讚貼文'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.responses[200] = {
            description: '所有按讚貼文',
            schema: {
                status: 'success',
                message: '取得成功',
                data: {
                    _id: '628a3f7bfd8374422f6af95e',
                    user: {
                        _id: '628a3f7bfd8374422f6af95e',
                        name: '漂亮阿姨',
                        photo: ''
                    },
                    content: '安安我是阿姨',
                    image: '',
                    likes: [
                        '628a3f7bfd8374422f6af95e'
                    ],
                    comments: [],
                    createdAt: '2022-05-22T13:49:47.540Z'
                }
            }
        }
     */
    users.getLikePosts(req, res, next);
});

// 新增追蹤用戶
router.post('/user/:id/follow', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '新增追蹤用戶'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.parameters['id'] = {
            in: 'path',
            type: 'string',
            required: true,
            description: '用戶id'
        }
     * #swagger.responses[200] = {
            description: '追蹤用戶資訊',
            schema: {
                status: 'success',
                message: '追蹤成功',
                data: {}
            }
        }
     */
    users.postFollow(req, res, next);
});

// 刪除追蹤用戶
router.delete('/user/:id/follow', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '刪除追蹤用戶'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.parameters['id'] = {
            in: 'path',
            type: 'string',
            required: true,
            description: '用戶id'
        }
     * #swagger.responses[200] = {
            description: '刪除追蹤用戶資訊',
            schema: {
                status: 'success',
                message: '取消追蹤成功',
                data: {}
            }
        }
     */
    users.deleteFollow(req, res, next);
});

// 取得所有追蹤用戶
router.get('/user/following', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.description = '取得所有追蹤用戶'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.responses[200] = {
            description: '追蹤用戶資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: [{
                    user: {
                        _id: '628a383552ea6969a18f1eaf',
                        name: '漂亮阿姨',
                        photo: ''
                    },
                    _id: '628b98787b516c28c9c28ecf',
                    createdAt: '2022-05-23T14:21:44.180Z'
                }]
            }
        }
     */
    users.getFollowing(req, res, next);
});

module.exports = router;