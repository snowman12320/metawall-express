const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [ true, '貼文姓名未填寫' ]
        },
        content: {
            type: String,
            required: [ true, '貼文內容未填寫' ]
        },
        photo: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        createdAt: {
            type: Date,
            default: Date.now(),
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