/**
 * RESTFUL API 子路由
 */

const router = require('koa-router')();
const api = require('../controllers/api');
const apiPost = require('./../controllers/apiPost');


router.get('/test', api.testPage);
router.post('/test', api.testPost);
router.get('/posts', apiPost.list);

module.exports = router;
