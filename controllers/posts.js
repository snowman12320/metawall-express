const { successHandler, errorHandler } = require('../service/handler');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const checkObjectId = require('../service/validation');
const Post = require('../models/postsModel');
const Comment = require('../models/commentsModel');

const posts = {
    getData: handleErrorAsync(async (req, res, next) => {
        const { keyword, sort } = req.query;
        const dateSort = sort === 'desc' ? '-createdAt' : 'createdAt';
        const posts = await Post.find({ content: { $regex: keyword || '' } })
            .populate([
                { 
                    path: 'user', // post 內 user 欄位
                    select: 'name photo' // 取出相關聯 collection name & photo
                },
                { 
                    path: 'comments',
                    options: { sort: '-createdAt' }
                }
            ])
            .sort(dateSort);
        successHandler(res, "取得成功", posts);
    }),
    getUserData: handleErrorAsync(async (req, res, next) => {
        const userId = req.params.userId;
        const { keyword, sort } = req.query;
        const dateSort = sort === 'desc' ? '-createdAt' : 'createdAt';
        const data = {
                user: userId,
                content: { $regex: keyword || '' }
            };
        const posts = await Post.find(data)
            .populate([
                { 
                    path: 'user', // post 內 user 欄位
                    select: 'name photo' // 取出相關聯 collection name & photo
                },
                { 
                    path: 'comments',
                    options: { sort: '-createdAt' }
                }
            ])
            .sort(dateSort);
        successHandler(res, "取得成功", posts);
    }),
    getSingleData: handleErrorAsync(async (req, res, next) => {
        const id = req.params.id;
        checkObjectId(id, next);
        const post = await Post.findById(id)
            .populate([
                { 
                    path: 'user', // post 內 user 欄位
                    select: 'name photo' // 取出相關聯 collection name & photo
                },
                { 
                    path: 'comments',
                    options: { sort: '-createdAt' }
                }
            ])
        if (!post) {
            return appError('查無此貼文', 400, next);
        }
        successHandler(res, "取得成功", post);
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
        if (req.originalUrl.includes('/posts/')) {
            return appError("無此網站路由", 404, next);
        }
        await Post.deleteMany({});
        successHandler(res, "刪除成功");
    }),
    deleteSingleData: handleErrorAsync (async (req, res, next) => {
        const id = req.params.id;
        checkObjectId(id, next);
        const findPost = await Post.findById(id);
        if (!findPost) {
            return appError("刪除失敗，查無此貼文", 400, next);
        }
        if (findPost.user.toString() !== req.user.id) {
            return appError("您沒有刪除此貼文權限", 401, next);
        }
        await Post.findByIdAndDelete(id);
        successHandler(res, "刪除成功");
    }),
    patchData: handleErrorAsync (async (req, res, next) => {
        const id = req.params.id;
        const { content, image } = req.body;
        const data = { content, image };
        checkObjectId(id, next);
        const findPost = await Post.findById(id);
        if (!findPost) {
            return appError("更新失敗，查無此貼文", 400, next);
        }
        if (!data.content) {
            return appError("更新失敗，貼文內容必填", 400, next);
        }
        if (findPost.user.toString() !== req.user.id) {
            return appError("您沒有編輯此貼文權限", 401, next);
        }
        const editPost = await Post.findByIdAndUpdate(id, data, { returnDocument: 'after' });
        successHandler(res, "更新成功", editPost);
    }),
    patchLike: handleErrorAsync (async (req, res, next) => {
        const userId = req.user.id; // 登入者
        const postId = req.params.id;
        checkObjectId(postId, next);
        const findPost = await Post.findById(postId);
        if (!findPost) {
            return appError("更新失敗，查無此貼文", 400, next);
        }
        let updatePost;
        if (findPost.likes.includes(userId)) {
            updatePost = await Post.findByIdAndUpdate( // 收回
                postId,
                { $pull: { likes: userId } },
                { returnDocument: 'after' }
            );
        } else {
            updatePost = await Post.findByIdAndUpdate( // 新增
                postId,
                { $push: { likes: userId } },
                { returnDocument: 'after' }
            );
        }
        successHandler(res, "更新成功", updatePost);
    }),
    postComment: handleErrorAsync (async (req, res, next) => {
        const user = req.user.id; // 登入者
        const post = req.params.id;
        const { content } = req.body;
        // 檢查內容是否填寫
        if (!content) {
            return appError('貼文內容必填', 400, next);
        }
        checkObjectId(post, next);
        // 檢查有無貼文
        const findPost = await Post.findById(post);
        if (!findPost) {
            return appError("新增失敗，查無此貼文", 400, next);
        }
        const data = { user, content, post };
        const message = await Comment.create(data);
        const getPost = await Post.findByIdAndUpdate(
            post, 
            { $push: { comments: [ message._id ] } },
            { returnDocument: 'after' }
        ).populate([
            { 
                path: 'user',
                select: 'name photo'
            },
            { 
                path: 'comments',
                populate: { 
                    path: 'user',
                    select: 'name photo'
                },
                options: { sort: '-createdAt' }
            }
        ]);
        successHandler(res, "新增成功", getPost);
    })
}

module.exports = posts;