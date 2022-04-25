const { successHandler, errorHandler } = require('../service/handler');
const File = require('../models/filesModel');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});
const dotenv = require('dotenv');
const { S3Client } = require("@aws-sdk/client-s3");
dotenv.config({path:'./.env'});

const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const files = {
    postData: async (req, res) => {
        try {
            const { file } = req.body;
            const fileName = file.name;
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: fileName,
                Body: file
            };
            try {
                const data = await s3.upload(params, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Bucket Created Successfully', data.Location);
                    }
                });
            } catch (err) {
                return alert("There was an error uploading your photo: ", err.message);
            }
            // const newFile = await File.create(data);
            // successHandler(res, "新增成功", newFile);
            res.end();
        } catch(error) {
            const errorStr = Object.values(error.errors).map(item => item.message).join('、');
            errorHandler(res, errorStr);
        }
    }
}

module.exports = files;