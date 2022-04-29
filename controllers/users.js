const { successHandler, errorHandler } = require('../service/handler');
const User = require('../models/usersModel');

const users = {
    getData: async (req, res) => {
        const user = await User.find();
        successHandler(res, "取得成功", user);
    }
}

module.exports = users;