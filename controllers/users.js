const { successHandler, errorHandler } = require('../service/handler');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const bcrypt = require('bcryptjs'); // 密碼加密
const validator = require('validator'); // 格式驗證
const User = require('../models/usersModel');
const { checkAuth, generateSendJWT } = require('../service/auth');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

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
            const errorMessage = errorMessageArr.join(', ');
            return appError(errorMessage, 400, next);
        }

        const findUserByName = await User.findOne({ name });
        if (findUserByName) {
            return appError('暱稱重複', 400, next);
        }

        const findUserByMail = await User.findOne({ email });
        if (findUserByMail) {
            return appError('email 已註冊', 400, next);
        }

        password = await bcrypt.hash(password, 12); // 密碼加密
        const data = { name, email, password, photo: '', gender: '' };
        await User.create(data);
        successHandler(res, "註冊成功，請重新登入", {}, 201);
    }),
    login: handleErrorAsync(async (req, res, next) => {
        let { email, password } = req.body;
        if (!email || !password) {
            return appError('帳號及密碼必填', 400, next);
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return appError('帳號錯誤或尚未註冊', 400, next);
        }
        const isVerify = await bcrypt.compare(password, user.password);
        if (!isVerify) {
            return appError('您的密碼不正確', 400, next);
        }
        generateSendJWT(res, "登入成功", user); // 產生 token
    }),
    getProfile: handleErrorAsync(async (req, res, next) => {
        successHandler(res, "取得成功", req.user);
    }),
    viewProfile: handleErrorAsync(async (req, res, next) => {
        if (!req.params.name) {
            return appError('使用者必填', 400, next);
        }
        const user = await User.findOne({ name: req.params.name });
        if (!user) {
            return appError('查無使用者', 400, next);
        }
        const { name, photo } = user;
        successHandler(res, "取得成功", { name, photo });
    }),
    updatePassword: handleErrorAsync(async (req, res, next) => {
        const { password, confirmPassword } = req.body;
        const errorMessageArr = [];
        if (password !== confirmPassword) {
            errorMessageArr.push('密碼不一致');
        }
        if (!validator.isLength(password, { min: 8 })) {
            errorMessageArr.push('密碼長度必須超過 8 碼');
        }
        if (errorMessageArr.length > 0) {
            const errorMessage = errorMessageArr.join(', ');
            return appError(errorMessage, 400, next);
        }
        newPassword = await bcrypt.hash(password, 12); // 密碼加密
        const updateUser = await User.findByIdAndUpdate(req.user.id, {
            password: newPassword
        });
        generateSendJWT(res, "更新成功", updateUser); // 產生新 token
    }),
    patchProfile: handleErrorAsync(async (req, res, next) => {
        const { name, photo, gender } = req.body;
        const data = { name, photo, gender };
        if (!name) {
            return appError("名稱必填", 400, next);
        }
        await User.findByIdAndUpdate(req.user.id, data);
        const updateUser = await User.findById(req.user.id);
        successHandler(res, "更新成功", updateUser);
    })
}

module.exports = users;