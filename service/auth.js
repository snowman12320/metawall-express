const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const { successHandler } = require('../service/handler');

const jwt = require('jsonwebtoken'); // token

const User = require('../models/usersModel');

// 檢查 token 是否存在
const checkAuth = handleErrorAsync(async (req, res, next) => {
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
    //   console.log(token); //eyJhbG ...
    //   console.log(payload); // undefined

    if (error) {
      return appError('驗證失敗，請重新登入', 401, next);
    }
    return payload;
  });

  //   console.log(decode); //{ id: '65ffdfd80fe750d0f8c8c86c', iat: 1711460120 }
  const currentUser = await User.findById(decode.id);
  req.user = currentUser;
  next();
});

// 產生 JWT token
const generateSendJWT = (res, message, user) => {
  //    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //      expiresIn: process.env.JWT_EXPIRES_DAY, // ! 多餘的參數，導致無法解密
  //    });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
  //* 隱藏密碼
  user.password = undefined;

  //* 登入成功，回傳 token，並攜帶使用者資料，供前端使用，不用再發送請求取得使用者資料
  const data = {
    token,
    profile: {
      _id: user._id,
      name: user.name,
      photo: user.photo,
    },
  };

  successHandler(res, message, data);
};

module.exports = { checkAuth, generateSendJWT };
