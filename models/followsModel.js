const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User', // 連接到 User collection
            required: [ true, 'user id 未填寫' ]
        },
        following: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [ true, '追蹤用戶 id 未填寫' ]
        },
        createdAt: {
            type: Date,
            default: Date.now, // 即時更新
            select: true
        }
    },
    {
        versionKey: false
    }
)
const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;