const { successHandler, errorHandler } = require('../service/handler');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');

const posts = {
    getData: async (req, res) => {
        const { keyword, sort } = req.query;
        const dateSort = sort === 'desc' ? -1 : 1;
        const posts = await Post.find({
            content: { $regex: keyword || '' }
        })
            .populate({ 
                path: 'user', // post 內 user 欄位
                select: 'name photo' // 取出相關聯 collection name & photo
            })
            .sort({ 'createdAt': dateSort });
        successHandler(res, "取得成功", posts);
    },
    postData: async (req, res) => {
        try {
            const { user, content, image, likes } = req.body;
            const data = { user, content, image, likes };
            const errorMessage = [];
            if (!user) {
                errorMessage.push('查無使用者');
            }
            if (!content) {
                errorMessage.push('內容必填');
            }
            if (errorMessage.length === 0) {
                const newPost = await Post.create(data);
                successHandler(res, "新增成功", newPost);
            } else {
                errorHandler(res, errorMessage.join(', '));
            }
        } catch(error) {
            const errorStr = Object.values(error.errors).map(item => item.message).join('、');
            errorHandler(res, errorStr);
        }
    },
    deleteAllData: async (req, res) => {
        if (req.originalUrl === '/posts/') {
            errorHandler(res, "無此網站路由", 404);
        } else {
            await Post.deleteMany({});
            successHandler(res, "刪除成功");
        }
    },
    deleteSingleData: async (req, res) => {
        try {
            const deletePost = await Post.findByIdAndDelete(req.params.id);
            if (!deletePost) { // 查無此筆(deletePost=null，跳false訊息)
                errorHandler(res, "刪除失敗，查無此id");
            } else {
                successHandler(res, "刪除成功");
            }
        } catch(error) {
            errorHandler(res, "刪除失敗，查無此id");
        }
    },
    patchData: async (req, res) => {
        try {
            const { user, content, image, likes } = req.body;
            const data = { user, content, image, likes };
            if (!data.content) {
                errorHandler(res, "更新失敗，貼文內容必填");
            } else {
                const editPost = await Post.findByIdAndUpdate(req.params.id, data);
                if (!editPost) { // 查無此筆(editPost=null，跳false訊息)
                    errorHandler(res, "更新失敗，查無此id或欄位格式錯誤");
                } else {
                    const post = await Post.findById(req.params.id)
                        .populate({ 
                            path: 'user', // post 內 user 欄位
                            select: 'name photo' // 取出相關聯 collection name & photo
                        });
                    successHandler(res, "更新成功", post);
                }
            }
        } catch(error) {
            errorHandler(res, "更新失敗，查無此id或欄位格式錯誤");
        }
    }
}

module.exports = posts;