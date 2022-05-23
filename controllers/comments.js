const { successHandler, errorHandler } = require('../service/handler');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const checkObjectId = require('../service/validation');
const Comment = require('../models/commentsModel');

const comments = {
    patchLike: handleErrorAsync (async (req, res, next) => {
        const userId = req.user.id; // 登入者
        const id = req.params.id;
        checkObjectId(id, next);
        const findComment = await Comment.findById(id);
        if (!findComment) {
            return appError("更新失敗，查無此留言", 400, next);
        }
        if (findComment.likes.includes(userId)) {
            await Comment.findByIdAndUpdate( // 收回
                id,
                { $pull: { likes: userId } }
            );
        } else {
            await Comment.findByIdAndUpdate( // 新增
                id,
                { $push: { likes: userId } }
            );
        }
        const updateComment = await Comment.findById(id);
        successHandler(res, "更新成功", updateComment);
    })
}

module.exports = comments;