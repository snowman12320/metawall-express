const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');
const { errorHandler } = require('./service/handler');

const app = express();

mongoose.connect('mongodb://localhost:27017/testPost6')
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
