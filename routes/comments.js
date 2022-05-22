
const express = require('express');
const router = express.Router();
const comments = require('../controllers/comments');
const { checkAuth, generateSendJWT } = require('../service/auth');

// 留言按讚/收回讚
router.patch('/:id/likes', checkAuth, (req, res, next) => {
    comments.patchLike(req, res, next);
});

module.exports = router;