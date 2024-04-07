const express = require('express'); // express 框架
const path = require('path'); // 
const cookieParser = require('cookie-parser'); // cookie 解析
const logger = require('morgan'); // log 紀錄
const cors = require('cors'); // 跨域
const dotenv = require('dotenv'); // 環境變數
const swaggerUI = require('swagger-ui-express'); // swagger

const swaggerFile = require('./swagger-output.json');
const { errorHandler } = require('./service/handler');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');
const filesRouter = require('./routes/files');
const imgurFilesRouter = require('./routes/imgurFiles');

const app = express();
// const history = require('connect-history-api-fallback'); // history 模式

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
app.use(cors()); // 跨域
app.use(logger('dev')); // log 紀錄
app.use(express.json()); // 解析 json 格式
app.use(express.urlencoded({ extended: false })); // 解析 urlencoded 格式
app.use(cookieParser());// cookie 解析
app.use(express.static(path.join(__dirname, 'public'))); // 靜態檔案

// 路由
app.use('/api/v1', filesRouter);
app.use('/api/v1', usersRouter);
app.use('/api/v1', postsRouter);
app.use('/api/v1', commentsRouter);
app.use('/api/v1', imgurFilesRouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile)); // http://localhost:3000/api-doc/
// app.use(history());

// 404 錯誤
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

// 自訂錯誤處理，依照環境不同，回傳不同錯誤訊息
app.use((error, req, res, next) => {
    // dev
    if (process.env.NODE_ENV === 'develop') {
        return resErrorDev(error, res);
    }
    
    // prod
    if (error.name === 'ValidationError') {
        error.message = '資料欄位填寫錯誤，請重新輸入！';
        error.isOperational = true; // 錯誤狀態是否預期的
        return resErrorProd(error, res);
    }
    resErrorProd(error, res);
});

// 未捕捉到的 catch
process.on('unhandledRejection', (error, promise) => {
    console.log('未捕捉到的 rejection：', promise, '原因：', error);
})

module.exports = app;
