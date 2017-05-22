/**
 * 主页子路由
 */

const router = require('koa-router')();
const index = require('../controllers/home');


router.get('/', index.indexPage);
router.get('/login', index.loginPage);

module.exports = router;
