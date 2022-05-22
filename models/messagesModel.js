const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User', // 連接到 User collection
            required: [ true, 'user id 未填寫' ]
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
)
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;