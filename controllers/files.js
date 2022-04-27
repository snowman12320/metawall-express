const { successHandler, errorHandler } = require('../service/handler');
const File = require('../models/filesModel');
const dotenv = require('dotenv');
dotenv.config({path:'../.env'});
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

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
            cb(null, Date.now().toString())
        }
    })
})

const singleUpload = upload.single('image');

const files = {
    postData: async (req, res) => {
        try {
            singleUpload(req, res, function(err, some) {
                successHandler(res, "新增成功", req.file.location);
                return successHandler(res, "新增成功", req.file.location);
            });
        } catch(error) {
            errorHandler(res, error.message);
        }
    }
}

module.exports = files;