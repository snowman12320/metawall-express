const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const { checkAuth, generateSendJWT } = require('../service/auth');

router.get('', (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '取得全部貼文'
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
                    name: '王小明',
                    photo: 'aaa.jpg',
                    content: '這是我的貼文內容',
                    image: 'bbb.jpg',
                    likes: 20000,
                    _id: '6276252a59d61d0687896756',
                    createdAt: '2022-05-07T07:52:10.937Z'
                }]
            }
        }
     */
    posts.getData(req, res, next);
});

router.post('', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '新增單一貼文'
     * #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            required: true,
            description: '資料格式',
            schema: {
                $user: '626c14b5fdb48b9d205ef262',
                $content: '這是我的貼文內容',
                image: 'bbb.jpg',
                likes: 300
            }
        }
     * #swagger.responses[200] = {
            description: '貼文資訊',
            schema: {
                status: 'success',
                message: '取得成功',
                data: {
                    name: '王小明',
                    photo: 'aaa.jpg',
                    content: '這是我的貼文內容',
                    image: 'bbb.jpg',
                    likes: 20000,
                    _id: '6276252a59d61d0687896756',
                    createdAt: '2022-05-07T07:52:10.937Z'
                }
            }
        }
     */
    posts.postData(req, res, next);
});

router.delete('', (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '刪除全部貼文'
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

router.delete('/:id', (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '刪除單一貼文'
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

router.patch('/:id', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.description = '編輯單一貼文'
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
                $user: '626c14b5fdb48b9d205ef262',
                $content: '這是我的貼文內容',
                image: 'bbb.jpg',
                likes: 300
            }
        }
     * #swagger.responses[200] = {
            description: '貼文資訊',
            schema: {
                status: 'success',
                message: '更新成功',
                data: {
                    name: '王小明',
                    photo: 'aaa.jpg',
                    content: '這是我的貼文內容',
                    image: 'bbb.jpg',
                    likes: 20000,
                    _id: '6276252a59d61d0687896756',
                    createdAt: '2022-05-07T07:52:10.937Z'
                }
            }
        }
     */
    posts.patchData(req, res, next);
});

module.exports = router;
