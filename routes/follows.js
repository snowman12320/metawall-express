const express = require('express');
const router = express.Router();
const follows = require('../controllers/follows');
const { checkAuth, generateSendJWT } = require('../service/auth');

// 取得追蹤用戶
router.get('', checkAuth, (req, res, next) => {
    follows.getFollowing(req, res, next);
});

// 新增追蹤用戶
router.post('/:id', checkAuth, (req, res, next) => {
    follows.postFollowing(req, res, next);
});

// 刪除追蹤用戶
router.delete('/:id', checkAuth, (req, res, next) => {
    follows.deleteFollowing(req, res, next);
});

module.exports = router;