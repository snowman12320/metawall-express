const express = require('express');
const router = express.Router();
const imgurFiles = require('../controllers/imgurFiles');
const { checkAuth, generateSendJWT } = require('../service/auth');

router.post('', checkAuth, (req, res, next) => {
    imgurFiles.postData(req, res, next);
});

module.exports = router;