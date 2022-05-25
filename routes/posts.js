const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const { checkAuth, generateSendJWT } = require('../service/auth');

// 取得所有貼文
router.get('/posts', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '取得全部貼文'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.parameters['sort'] = {
            in: 'query',
            type: 'string',
            required: false,
            description: '排序：desc/asc'
        }
    * #swagger.parameters['keyword'] = {
            in: 'query',
            type: 'string',
            required: false,
            description: '關鍵字搜尋'
        }
     * #swagger.responses[200] = {
            description: '貼文資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: [{
                    _id: '6276252a59d61d0687896756',
                    user: {
                        _id: '628a3f7bfd8374422f6af95e',
                        name: '王小明',
                        photo: ''
                    },
                    content: '這是我的貼文歐',
                    image: 'bbb.jpg',
                    likes: [],
                    comments: [],
                    createdAt: '2022-05-07T07:52:10.937Z'
                }]
            }
        }
     */
    posts.getData(req, res, next);
});

// 取得特定用戶的貼文
router.get('/posts/user/:userId', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '取得特定用戶的貼文'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.parameters['sort'] = {
            in: 'query',
            type: 'string',
            required: false,
            description: '排序：desc/asc'
        }
     * #swagger.parameters['keyword'] = {
            in: 'query',
            type: 'string',
            required: false,
            description: '關鍵字搜尋'
        }
     * #swagger.parameters['userId'] = {
            in: 'path',
            type: 'string',
            required: true,
            description: 'user id'
        }
     * #swagger.responses[200] = {
            description: '貼文資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: [{
                    _id: '6276252a59d61d0687896756',
                    user: {
                        _id: '628a3f7bfd8374422f6af95e',
                        name: '王小明',
                        photo: ''
                    },
                    content: '這是我的貼文歐',
                    image: 'bbb.jpg',
                    likes: [],
                    comments: [],
                    createdAt: '2022-05-07T07:52:10.937Z'
                }]
            }
        }
     */
    posts.getUserData(req, res, next);
});

// 取得單筆貼文
router.get('/post/:id', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '取得單筆貼文'
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
            description: '貼文 id'
        }
     * #swagger.responses[200] = {
            description: '貼文資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: {
                    _id: '6276252a59d61d0687896756',
                    user: {
                        _id: '628a3f7bfd8374422f6af95e',
                        name: '王小明',
                        photo: ''
                    },
                    content: '這是我的貼文歐',
                    image: 'bbb.jpg',
                    likes: [],
                    comments: [],
                    createdAt: '2022-05-07T07:52:10.937Z'
                }
            }
        }
     */
    posts.getSingleData(req, res, next);
});

// 新增貼文
router.post('/post', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '新增單筆貼文'
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
                $content: '這是我的貼文歐',
                image: 'bbb.jpg'
            }
        }
     * #swagger.responses[200] = {
            description: '貼文資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: {
                    user: '628a3f7bfd8374422f6af95e',
                    content: '這是我的貼文歐',
                    image: 'bbb.jpg',
                    likes: [],
                    comments: [],
                    _id: '628b8d05e2d52948f5bb8b81',
                    createdAt: '2022-05-23T13:32:53.653Z'
                }
            }
        }
     */
    posts.postData(req, res, next);
});

// 刪除所有貼文
router.delete('/posts', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '刪除全部貼文'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.responses[200] = {
            schema: {
                status: 'success',
                message: '刪除成功',
                data: {}
            }
        }
     */
    posts.deleteAllData(req, res, next);
});

// 刪除單筆貼文
router.delete('/post/:id', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '刪除單筆貼文'
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
            description: '貼文 id'
        }
     * #swagger.responses[200] = {
            schema: {
                status: 'success',
                message: '刪除成功',
                data: {}
            }
        }
     */
    posts.deleteSingleData(req, res, next);
});

// 編輯單筆貼文
router.patch('/post/:id', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '編輯單筆貼文'
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
            description: '貼文 id'
        }
     * #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            required: true,
            description: '資料格式',
            schema: {
                $content: 'aloha',
                image: 'bbb.jpg'
            }
        }
     * #swagger.responses[200] = {
            description: '貼文資訊',
            schema: {
                status: 'success',
                message: '更新成功',
                data: {
                    _id: '628b8d05e2d52948f5bb8b81',
                    user: {
                        _id: '628a3f7bfd8374422f6af95e',
                        name: '王小明',
                        photo: ''
                    },
                    content: 'aloha',
                    image: 'bbb.jpg',
                    likes: [],
                    comments: [],
                    createdAt: '2022-05-23T13:32:53.653Z'
                }
            }
        }
     */
    posts.patchData(req, res, next);
});

// 貼文按讚/收回讚
router.patch('/post/:id/likes', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '貼文按讚/收回讚'
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
            description: '貼文 id'
        }
     * #swagger.responses[200] = {
            description: '貼文資訊',
            schema: {
                status: 'success',
                message: '更新成功',
                data: {
                    _id: '628b89e27bb3be30ae6e0656',
                    user: '628a3f7bfd8374422f6af95e',
                    content: '嗨你好',
                    image: '',
                    likes: [
                        '628a3f7bfd8374422f6af95e'
                    ],
                    comments: [],
                    createdAt: '2022-05-23T13:19:30.054Z'
                }
            }
        }
     */
    posts.patchLike(req, res, next);
});

// 新增留言
router.post('/post/:id/comment', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '新增留言'
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
                $content: '我來留言囉'
            }
        }
     * #swagger.responses[200] = {
            description: '貼文資訊',
            schema: {
                status: 'success',
                message: '新增成功',
                data: {
                    _id: '628b89e27bb3be30ae6e0656',
                    user: {
                        _id: '628a3f7bfd8374422f6af95e',
                        name: '王小明',
                        photo: ''
                    },
                    content: '這是我的貼文歐',
                    image: '',
                    likes: [],
                    comments: [
                        {
                            _id: '628b89fd7bb3be30ae6e065d',
                            user: {
                                _id: '628a3f7bfd8374422f6af95e',
                                name: '漂亮阿姨',
                                photo: ''
                            },
                            post: '628b89e27bb3be30ae6e0656',
                            content: '歐是歐',
                            likes: [],
                            createdAt: '2022-05-23T13:19:57.910Z'
                        }
                    ],
                    createdAt: '2022-05-23T13:19:30.054Z'
                }
            }
        }
     */
    posts.postComment(req, res, next);
});

module.exports = router;
