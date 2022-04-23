const { successHandler, errorHandler } = require('../service/handler');
const Post = require('../models/postsModel');

const posts = {
    getData: async (req, res) => {
        const { content } = req.query;
        const post = await Post.find({
            content: { $regex: content || '' }
        }).sort({ 'createdAt': -1 });
        successHandler(res, "取得成功", post);
    },
    postData: async (req, res) => {
        try {
            const { name, content, photo, image, likes } = req.body;
            const data = { name, content, photo, image, likes };
            const newPost = await Post.create(data);
            successHandler(res, "新增成功", newPost);
        } catch(error) {
            const errorStr = Object.values(error.errors).map(item => item.message).join('、');
            errorHandler(res, errorStr);
        }
    },
    deleteAllData: async res => {
        await Post.deleteMany({});
        successHandler(res, "刪除成功");
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
            const { name, content, photo, image, likes } = req.body;
            const data = { name, content, photo, image, likes };
            if (!data.content) {
                errorHandler(res, "更新失敗，貼文內容必填");
            } else {
                const editPost = await Post.findByIdAndUpdate(req.params.id, data);
                if (!editPost) { // 查無此筆(editPost=null，跳false訊息)
                    errorHandler(res, "更新失敗，查無此id或欄位格式錯誤");
                } else {
                    const post = await Post.findById(req.params.id);
                    successHandler(res, "更新成功", post);
                }
            }
        } catch(error) {
            errorHandler(res, "更新失敗，查無此id或欄位格式錯誤");
        }
    }
}

module.exports = posts;