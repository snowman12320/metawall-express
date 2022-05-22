
const express = require('express');
const router = express.Router();
const messages = require('../controllers/messages');
const { checkAuth, generateSendJWT } = require('../service/auth');

// 新增留言
router.post('', checkAuth, (req, res, next) => {
    messages.postMessage(req, res, next);
});

// 留言按讚/收回讚
router.patch('/:id/likes', checkAuth, (req, res, next) => {
    messages.patchLike(req, res, next);
});

module.exports = router;