const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User', // 連接到 User collection
            required: [ true, 'user id 未填寫' ]
        },
        content: {
            type: String,
            required: [ true, '貼文內容未填寫' ]
        },
        image: {
            type: String,
            default: ''
        },
        likes: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now, // 即時更新
            select: true
        }
    },
    {
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

postSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'post', // commentSchema 內 post 欄位
    localField: '_id' // postSchema id
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;