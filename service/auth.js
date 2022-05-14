const jwt = require('jsonwebtoken'); // token
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const { successHandler, errorHandler } = require('../service/handler');
const User = require('../models/usersModel');

// 檢查 token 是否存在
const checkAuth = handleErrorAsync (async (req, res, next) => {
    let token;
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
        token = auth.split(' ')[1];
    }
    if (!token) {
        return appError('請重新登入', 401, next);
    }
    // 解密，還原物件
    const decode = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
            error ? reject(error) : resolve(payload);
        });
    });
    const currentUser = await User.findById(decode.id);
    req.user = currentUser;
    next();
});

// 產生 JWT token
const generateSendJWT = (res, message, user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY
    });
    user.password = undefined;
    const data = {
        token,
        profile: {
            name: user.name,
            photo: user.photo
        }
    };
    successHandler(res, message, data);
};

module.exports = { checkAuth, generateSendJWT };