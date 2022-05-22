const { successHandler, errorHandler } = require('../service/handler');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const checkObjectId = require('../service/validation');
const Follow = require('../models/followsModel');

const follows = {
    getFollowing: handleErrorAsync(async (req, res, next) => {
        const user = req.user.id;
        const following = await Follow.find({ user } )
            .populate({ 
                path: 'following', // following 欄位
                select: 'name photo' // 取出相關聯 collection name & photo
            })
            .sort('-createdAt');
        successHandler(res, "取得成功", following);
    }),
    postFollowing: handleErrorAsync(async (req, res, next) => {
        const user = req.user.id;
        const following = req.params.id;
        if (user === following) {
            return appError("不可以追蹤自己歐！", 400, next);
        }
        checkObjectId(following, next);
        const findFollow = await Follow.findOne({ user, following });
        if (findFollow) {
            return appError("您已追蹤此用戶", 400, next);
        }
        const newFollow = await Follow.create({ user, following });
        successHandler(res, "新增成功", newFollow);
    }),
    deleteFollowing: handleErrorAsync (async (req, res, next) => {
        const user = req.user.id;
        const following = req.params.id;
        checkObjectId(following, next);
        const findFollow = await Follow.findOne({ user, following });
        if (!findFollow) {
            return appError("您尚未追蹤此用戶", 400, next);
        }
        const deleteFollow = await Follow.deleteOne({ user, following });
        if (!deleteFollow) {
            return appError("刪除失敗，查無此用戶id", 400, next);
        }
        successHandler(res, "刪除成功");
    })
}

module.exports = follows;