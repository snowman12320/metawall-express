const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');
const { errorHandler } = require('./service/handler');
const dotenv = require('dotenv');
const { CreateBucketCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("./libs/s3Client.js");

dotenv.config({path:'./.env'});

// Set the bucket parameters
const bucketParams = {
    Bucket: process.env.AWS_BUCKET
};
// Create the Amazon S3 bucket.
const run = async () => {
    try {
        const data = await s3.send(new CreateBucketCommand(bucketParams));
        console.log(data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};
run();

const app = express();

// 設定連線網址
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB)
    .then(res=> console.log("連線資料成功"));

// 載入設定檔
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRouter);
app.use((req, res, next) => {
    errorHandler(res, "無此網站路由", 404);
});
app.use((error, req, res, next) => {
    errorHandler(res, "系統異常", 500);
});

module.exports = app;
