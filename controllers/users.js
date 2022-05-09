const { successHandler, errorHandler } = require('../service/handler');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/usersModel');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

// 登入成功回傳 token
const generateSendJWT = (res, message, user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY
    });
    user.password = undefined;
    const data = {
        token,
        name: user.name
    };
    successHandler(res, message, data);
};

const users = {
    register: handleErrorAsync(async (req, res, next) => {
        let { name, email, password, confirmPassword } = req.body;
        if ( !name || !email || !password || !confirmPassword) {
            return appError('欄位未填寫完整', 400, next);
        }

        const errorMessageArr = [];
        if (password !== confirmPassword) {
            errorMessageArr.push('密碼不一致');
        }
        if (!validator.isLength(password, { min: 8 })) {
            errorMessageArr.push('密碼長度必須超過 8 碼');
        }
        if (!validator.isEmail(email)) {
            errorMessageArr.push('email 格式不正確');
        }
        if (errorMessageArr.length > 0) {
            console.log(errorMessageArr);
            const errorMessage = errorMessageArr.join(', ');
            return appError(errorMessage, 400, next);
        }

        // 密碼加密
        password = await bcrypt.hash(password, 12);
        await User.create({ name, email, password });
        successHandler(res, "註冊成功，請重新登入", {}, 201);
    }),
    login: handleErrorAsync(async (req, res, next) => {
        let { email, password } = req.body;
        if ( !email || !password) {
            return appError('帳號及密碼必填', 400, next);
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return appError('此帳號尚未註冊', 400, next);
        }
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) {
            return appError('您的密碼不正確', 400, next);
        }
        generateSendJWT(res, "登入成功", user);
    })
}

module.exports = users;