const router = require('koa-router')();

const index = require('./index');
const apiUser = require('./apiUser');
const apiPost = require('./apiPost');


router.use('/', index.routes(), index.allowedMethods());
router.use('/api/v0.1/user', apiUser.routes(), apiUser.allowedMethods());
router.use('/api/v0.1/post', apiPost.routes(), apiPost.allowedMethods());


module.exports = router;
