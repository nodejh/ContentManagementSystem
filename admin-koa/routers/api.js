/**
 * RESTFUL API 子路由
 */

const router = require('koa-router')();
const api = require('../controllers/api');
const apiPost = require('./../controllers/apiPost');
const apiTask = require('./../controllers/apiTask');
const apiSign = require('./../controllers/apiSign');
const apiLogin = require('./../controllers/apiLogin');


router.get('/test', api.testPage);
router.post('/test', api.testPost);
router.get('/posts', apiPost.list);
router.get('/tasks/:postId', apiTask.list);
router.get('/sign/:taskId', apiSign.list);
router.post('/post/delete', apiPost.deletePost);
router.post('/task/delete', apiTask.deleteTask);
router.post('/sign/delete', apiSign.deleteSign);
router.post('/login', apiLogin.login);
router.get('/logout', apiLogin.logout);

module.exports = router;
