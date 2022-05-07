const { successHandler, errorHandler } = require('../service/handler');
const multer = require('multer');
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

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, uuid4());
        }
    })
})

const singleUpload = upload.single('image');

const files = {
    postData: handleErrorAsync(async (req, res, next) => {
        singleUpload(req, res, function(err, some) {
            if (!req.file) {
                return appError("圖片上傳失敗：查無此圖片", 400, next);
            } else {
                successHandler(res, "新增成功", req.file.location);
            }
        });
    })
}

module.exports = files;