const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./service/handler');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const filesRouter = require('./routes/files');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const app = express();
const history = require('connect-history-api-fallback');

// 程式出現重大錯誤時
process.on('uncaughtException', error => {
    // 記錄錯誤下來，等到服務都處理完後，停掉該 process
    console.error('Uncaughted Exception！');
    console.error(error);
    process.exit(1);
});

dotenv.config({path:'./.env'});

// 連線 mongodb
require('./connections');

// 載入設定檔
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/files', filesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(history({
    verbose: true
}));

// 404
app.use((req, res, next) => {
    errorHandler(res, '無此網站路由', 404, 'error');
});

// 自訂 error 錯誤
// production 環境錯誤
const resErrorProd = (error, res) => {
    if (error.isOperational) {
        errorHandler(res, error.message, error.statusCode);
    } else {
        console.error('出現重大錯誤', error);
        // 送出預設訊息
        errorHandler(res, '系統異常', 500, 'error');
    }
}

// develop 環境錯誤
const resErrorDev = (error, res) => {
    res.status(error.statusCode).json({
        status: "false",
        message: error.message,
        error: error,
        stack: error.stack
    });
}

// JSON 格式錯誤
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    if (error instanceof SyntaxError && 'body' in error) {
        return errorHandler(res, error.message, error.statusCode);
    }
    next(error);
});

// 自訂錯誤處理
app.use((error, req, res, next) => {
    // dev
    if (process.env.NODE_ENV === 'develop') {
        return resErrorDev(error, res);
    }
    // prod
    if (error.name === 'ValidationError') {
        error.message = '資料欄位填寫錯誤，請重新輸入！';
        error.isOperational = true;
        return resErrorProd(error, res);
    }
    resErrorProd(error, res);
});

// 未捕捉到的 catch
process.on('unhandledRejection', (error, promise) => {
    console.log('未捕捉到的 rejection：', promise, '原因：', error);
})

module.exports = app;
