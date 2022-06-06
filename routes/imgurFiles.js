const express = require('express');
const router = express.Router();
const imgurFiles = require('../controllers/imgurFiles');
const { checkAuth, generateSendJWT } = require('../service/auth');

router.post('/imgur-file', checkAuth, (req, res, next) => {
    /**
     * #swagger.tags = ['imgurFiles']
     * #swagger.description = '上傳單張圖片'
     * #swagger.parameters['Authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Bearer token'
        }
     * #swagger.parameters['body'] = {
            in: 'formData',
            name: 'image',
            type: 'file',
            required: true,
            description: '資料格式'
        }
     * #swagger.responses[200] = {
            description: '圖片資訊',
            schema: {
                status: 'success',
                message: '上傳成功',
                data: 'https://i.imgur.com/t3ToMsx.jpg'
            }
        }
     */
    imgurFiles.postData(req, res, next);
});

module.exports = router;