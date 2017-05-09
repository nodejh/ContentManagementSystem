const router = require('koa-router')();

const index = require('./index');
const apiUpload = require('./apiUpload');
const apiUser = require('./apiUser');
const apiPost = require('./apiPost');


router.use('/', index.routes(), index.allowedMethods());
router.use('/api/v0.1/upload', apiUpload.routes(), apiUpload.allowedMethods());
router.use('/api/v0.1/post', apiPost.routes(), apiPost.allowedMethods());
router.use('/api/v0.1/user', apiUser.routes(), apiUser.allowedMethods());


module.exports = router;
