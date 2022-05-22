const { successHandler, errorHandler } = require('../service/handler');
const multer = require('multer'); // middleware used for express and Node.js to handle the file uploads
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const uuid4 = require('uuid4');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_DEFAULT_REGION
});

const s3 = new aws.S3();

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
    },
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) { // set image name
            cb(null, uuid4());
        }
    })
})

const singleUpload = upload.single('image');

const files = {
    postData: handleErrorAsync(async (req, res, next) => {
        singleUpload(req, res, error => {
            if (!req.file) {
                return appError("請選擇圖片", 400, next);
            }
            if (error) {
                return appError("檔案尺寸過大，或圖片發生錯誤", 400, next);
            }
            successHandler(res, "上傳成功", req.file.location);
        });
    })
}

module.exports = files;