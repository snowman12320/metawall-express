const mongoose = require('mongoose');
const appError = require('../service/appError');

const checkObjectId = (id, next) => {
    const isObjectId = mongoose.isObjectIdOrHexString(id); //* 判斷是否為 ObjectId
    if (!isObjectId) {
        return appError("id格式不正確", 400, next);
    }
};

module.exports = checkObjectId;