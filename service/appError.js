// 自訂義可預期錯誤
//* （使用Error物件）
const appError = (message, statusCode, next) => {
    const error = new Error(message); // 組成 message  
    error.statusCode = statusCode;
    error.isOperational = true;
    next(error);
};

module.exports = appError;