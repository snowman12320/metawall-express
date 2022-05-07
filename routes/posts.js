const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');

router.get('/', (req, res, next) => {
    posts.getData(req, res, next);
});

router.post('/', (req, res, next) => {
    posts.postData(req, res, next);
});

router.delete('/', (req, res, next) => {
    posts.deleteAllData(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    posts.deleteSingleData(req, res, next);
});

router.patch('/:id', (req, res, next) => {
    posts.patchData(req, res, next);
});

module.exports = router;
