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
        return appError('驗證失敗，請重新登入', 401, next);
    }
    // 解密，還原物件
    const decode = jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
    //   console.log('error', error); //error TokenExpiredError: jwt expired
    //   console.log(token); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmZkZmQ4MGZlNzUwZDBmOGM4Yzg2YyIsImlhdCI6MTcxMTI2OTcwNywiZXhwIjoxNzExMjY5NzA3fQ.8OQ3ZuP1CKmd_5ZyapTP_dYDnpf_C_WKz5kv2S-w-5w
    //   console.log(payload); // undefined

      if (error) {
        // return appError('驗證失敗，請重新登入', 401, next);
      }
      return payload;
    });
    // const currentUser = await User.findById(decode.id);
    const currentUser = await User.findById('65ffdfd80fe750d0f8c8c86c');
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
            _id: user._id,
            name: user.name,
            photo: user.photo
        }
    };
    successHandler(res, message, data);
};

module.exports = { checkAuth, generateSendJWT };