const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [ true, '請輸入您的名字' ]
        },
        email: {
            type: String,
            required: [ true, '請輸入您的 Email' ],
            unique: true,
            lowercase: true,
            select: false
        },
        photo: String,
        gender: {
            type: String,
            enum: { // 允許使用的字串集合
                values: [ 'female', 'male', '' ],
                message: '性別格式不正確'
            }
        },
        password: {
            type: String,
            required: [ true, '請輸入您的密碼' ],
            minlength: 8,
            select: false
        },
        //* 關注我的人，即我的粉絲
        followers: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'User', // 連接到 User collection
                },
                createdAt: {
                    type: Date,
                    default: Date.now, // 即時更新
                }
            }
        ],
        //* 追蹤中的人，即我追蹤的人
        following: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'User', // 連接到 User collection
                },
                createdAt: {
                    type: Date,
                    default: Date.now, // 即時更新
                }
            }
        ],
        //* 建立時間
        createdAt: {
            type: Date,
            default: Date.now, // 即時更新
        }
    },
    //* 不顯示版本號
    {
        versionKey: false
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;