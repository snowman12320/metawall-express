const express = require('express');
const router = express.Router();
const files = require('../controllers/files');

router.post('/', (req, res, next) => {
    files.postData(req, res, next);
});

module.exports = router;