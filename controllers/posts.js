const { successHandler, errorHandler } = require('../service/handler');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');

const posts = {
    getData: handleErrorAsync(async (req, res, next) => {
        const { name, keyword, sort } = req.query;
        const dateSort = sort === 'desc' ? '-createdAt' : 'createdAt';
        const user = name ? await User.findOne({ name }) : null;
        const data = user 
            ? { user: user._id, content: { $regex: keyword || '' } }
            : { content: { $regex: keyword || '' } };
        const posts = await Post.find(data)
            .populate({ 
                path: 'user', // post 內 user 欄位
                select: 'name photo' // 取出相關聯 collection name & photo
            })
            .sort(dateSort);
        successHandler(res, "取得成功", posts);
    }),
    postData: handleErrorAsync(async (req, res, next) => {
        const user = req.user.id;
        const { content, image } = req.body;
        const data = { user, content, image };
        if (!content) {
            return appError('內容必填', 400, next);
        }
        const newPost = await Post.create(data);
        successHandler(res, "新增成功", newPost);
    }),
    deleteAllData: handleErrorAsync (async (req, res, next) => {
        if (req.originalUrl === '/posts/') {
            return appError("無此網站路由", 404, next);
        } else {
            await Post.deleteMany({});
            successHandler(res, "刪除成功");
        }
    }),
    deleteSingleData: handleErrorAsync (async (req, res, next) => {
        const deletePost = await Post.findByIdAndDelete(req.params.id);
        if (!deletePost) { // 查無此筆(deletePost=null，跳false訊息)
            return appError("刪除失敗，查無此id", 400, next);
        } else {
            successHandler(res, "刪除成功");
        }
    }),
    patchData: handleErrorAsync (async (req, res, next) => {
        const { content, image, likes } = req.body;
        const data = { content, image, likes };
        if (!data.content) {
            return appError("更新失敗，貼文內容必填", 400, next);
        } else {
            const editPost = await Post.findByIdAndUpdate(req.params.id, data);
            if (!editPost) { // 查無此筆(editPost=null，跳false訊息)
                return appError("更新失敗，查無此id或欄位格式錯誤", 400, next);
            } else {
                const post = await Post.findById(req.params.id)
                    .populate({ 
                        path: 'user',
                        select: 'name photo'
                    });
                successHandler(res, "更新成功", post);
            }
        }
    })
}

module.exports = posts;