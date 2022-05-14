const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const { checkAuth, generateSendJWT } = require('../service/auth');

// router.get('', function(req, res, next) {
//     /**
//      * #swagger.tags = ['Users']
//      * #swagger.description = '取得全部 user'
//      * #swagger.responses[200] = {
//             description: 'user 資訊',
//             schema: {
//                 status: 'success',
//                 message: '取得成功',
//                 data: [{
//                     _id: '626c14b5fdb48b9d205ef262',
//                     name: '王小明',
//                     photo: 'aaa.jpg'
//                 }]
//             }
//         }
//      */
//     users.getData(req, res, next);
// });

router.post('/register', (req, res, next) => {
    /**
     * #swagger.ignore = true
     */
    users.register(req, res, next);
});

router.post('/login', (req, res, next) => {
    /**
     * #swagger.ignore = true
     */
    users.login(req, res, next);
});

router.get('/profile', checkAuth, (req, res, next) => {
    /**
     * #swagger.ignore = true
     */
    users.getProfile(req, res, next);
});

router.get('/profile/:name', (req, res, next) => { // 瀏覽個人頁面，不需驗證登入權限
    /**
     * #swagger.ignore = true
     */
    users.viewProfile(req, res, next);
});

router.patch('/profile', checkAuth, (req, res, next) => {
    /**
     * #swagger.ignore = true
     */
    users.patchProfile(req, res, next);
});

router.patch('/update_password', checkAuth, (req, res, next) => {
    /**
     * #swagger.ignore = true
     */
    users.updatePassword(req, res, next);
});

module.exports = router;