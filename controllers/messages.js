const { successHandler, errorHandler } = require('../service/handler');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const checkObjectId = require('../service/validation');
const Message = require('../models/messagesModel');
const Post = require('../models/postsModel');

const messages = {
    patchLike: handleErrorAsync (async (req, res, next) => {
        const userId = req.user.id; // 登入者
        const messageId = req.params.id;
        checkObjectId(messageId, next);
        const findMessage = await Message.findById(messageId);
        if (!findMessage) {
            return appError("更新失敗，查無此留言", 400, next);
        }
        if (findMessage.likes.includes(userId)) {
            await Message.findByIdAndUpdate( // 收回
                messageId,
                { $pull: { likes: userId } }
            );
        } else {
            await Message.findByIdAndUpdate( // 新增
                messageId,
                { $push: { likes: userId } }
            );
        }
        const updateMessage = await Message.findById(messageId)
            .populate({ 
                path: 'user',
                select: 'name photo'
            });
        successHandler(res, "更新成功", updateMessage);
    }),
    postMessage: handleErrorAsync (async (req, res, next) => {
        const user = req.user.id; // 登入者
        const { postId, content } = req.body;
        // 檢查內容是否填寫
        if (!postId || !content) {
            return appError('貼文id及內容必填', 400, next);
        }
        checkObjectId(postId, next);
        // 檢查有無貼文
        const findPost = await Post.findById(postId);
        if (!findPost) {
            return appError("新增失敗，查無此貼文", 400, next);
        }
        const data = { user, content };
        const message = await Message.create(data);
        await Post.findByIdAndUpdate(postId, {
            $push: { messages: [ message._id ] }
        });
        const post = await Post.findById(postId)
            .populate([
                { 
                    path: 'user', // post 內 user 欄位
                    select: 'name photo' // 取出相關聯 collection name & photo
                },
                { 
                    path: 'messages',
                    populate: { 
                        path: 'user',
                        select: 'name photo'
                    },
                    options: { sort: '-createdAt' }
                }
            ]);
        successHandler(res, "新增成功", post);
    })
}

module.exports = messages;