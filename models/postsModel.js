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
        createdAt: {
            type: Date,
            default: Date.now, // 即時更新
            select: true
        },
        likes: {
            type: Number,
            default: 0
        }
    },
    {
        versionKey: false
    }
)
const Post = mongoose.model('Post', postSchema);

module.exports = Post;