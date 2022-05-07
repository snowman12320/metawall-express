const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.get('/', function(req, res, next) {
    users.getData(req, res, next);
});

// login
router.get('/login', function(req, res, next) {
    users.getData(req, res, next);
});

module.exports = router;