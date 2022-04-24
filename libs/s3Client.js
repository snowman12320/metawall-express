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
module.exports = { s3 };