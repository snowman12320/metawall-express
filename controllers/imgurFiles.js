const { successHandler, errorHandler } = require('../service/handler');
const multer = require('multer'); // middleware used for express and Node.js to handle the file uploads
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const { ImgurClient } = require('imgur');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [ 'image/jpeg', 'image/jpg', 'image/png' ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        cb(new Error('圖片格式不正確'), false);
    }
    cb(null, true);
}

const upload = multer({
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 2 // 2MB
    }
});

const singleUpload = upload.single('image');

const imgurFiles = {
    postData: handleErrorAsync(async (req, res, next) => {
        singleUpload(req, res, async error => {
            if (error) {
                return appError("檔案尺寸過大，或圖片發生錯誤", 400, next);
            }
            if (!req.file) {
                return appError("請選擇圖片", 400, next);
            }
            const client = new ImgurClient({
                clientId: process.env.IMGUR_CLIENTID,
                clientSecret: process.env.IMGUR_CLIENT_SECRET,
                refreshToken: process.env.IMGUR_REFRESH_TOKEN,
            });
            const response = await client.upload({
                image: req.file.buffer.toString('base64'),
                type: 'base64',
                album: process.env.IMGUR_ALBUM_ID
            });
            successHandler(res, "上傳成功", response.data.link);
        });
    })
}

module.exports = imgurFiles;