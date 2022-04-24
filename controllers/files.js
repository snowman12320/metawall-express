const { successHandler, errorHandler } = require('../service/handler');
const File = require('../models/filesModel');
const { AbortMultipartUploadCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("../libs/s3Client.js");
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

const files = {
    postData: async (req, res) => {
        try {
            const { file } = req.body;

            const albumPhotosKey = encodeURIComponent(albumName) + "/";
            const data = await s3.send(
                new ListObjectsCommand({
                    Prefix: albumPhotosKey,
                    Bucket: 'image'
                })
            );
            const fileName = file.name;
            const photoKey = albumPhotosKey + fileName;
            const uploadParams = {
                Bucket: 'image',
                Key: photoKey,
                Body: file
            };
            try {
                const data = await s3.send(new PutObjectCommand(uploadParams));
                alert("Successfully uploaded photo.");
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