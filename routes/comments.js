
const express = require('express');
const router = express.Router();
const comments = require('../controllers/comments');
const { checkAuth, generateSendJWT } = require('../service/auth');

// 留言按讚/收回讚
router.patch('/comment/:id/likes', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Comments']
     * #swagger.description = '留言按讚/收回讚'
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
            description: '留言 id'
        }
     * #swagger.responses[200] = {
            description: '留言資訊',
            schema: {
                status: 'success',
                message: '更新成功',
                data: {
                    _id: '628b89e27bb3be30ae6e0656',
                    user: {
                        _id: '628a383552ea6969a18f1eaf',
                        name: '王小明',
                        photo: ''
                    },
                    post: '628a386b52ea6969a18f1eb3',
                    content: '我來留言囉',
                    likes: [
                        '628a3f7bfd8374422f6af95e'
                    ],
                    createdAt: '2022-05-23T13:19:30.054Z'
                }
            }
        }
     */
    comments.patchLike(req, res, next);
});

module.exports = router;