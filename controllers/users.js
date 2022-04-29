const { successHandler, errorHandler } = require('../service/handler');
const User = require('../models/usersModel');

const users = {
    getData: async (req, res) => {
        successHandler(res, "取得成功", { 'name': '王小明' });
    }
}

module.exports = users;