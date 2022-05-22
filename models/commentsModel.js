const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User', // 連接到 collection
            required: [ true, 'user id 未填寫' ]
        },
        post: {
            type: mongoose.Schema.ObjectId,
            ref: 'Post',
            required: [ true, '貼文 id 必填' ]
        },
        content: {
            type: String,
            required: [ true, '留言內容未填寫' ]
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
        versionKey: false
    }
);

commentSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;