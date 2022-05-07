const express = require('express');
const router = express.Router();
const files = require('../controllers/files');

router.post('', (req, res, next) => {
    /**
     * #swagger.tags = ['Files']
     * #swagger.description = '上傳單張圖片'
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
                data: 'https://metawallstorage3.s3.ap-northeast-2.amazonaws.com/d4037168'
            }
        }
     */
    files.postData(req, res, next);
});

module.exports = router;