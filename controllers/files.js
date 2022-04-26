const { successHandler, errorHandler } = require('../service/handler');
const File = require('../models/filesModel');
const dotenv = require('dotenv');
dotenv.config({path:'../.env'});
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");

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
            const { file, file_name } = req.body;
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: file_name,
                Body: file
            };
            const data = await new Upload({
                client: new s3({}),
                params: params
            });
            data.on("httpUploadProgress", (progress) => {
                console.log(progress);
            });
            await data.done();
            // const newFile = await File.create(data);
            // successHandler(res, "新增成功", newFile);
            res.end();
        } catch(error) {
            console.log(error);
            res.end();
        }
    }
}

module.exports = files;