const router = require('koa-router')();

const index = require('./index');
const api = require('./api');
const apiUser = require('./apiUser');


router.use('/', index.routes(), index.allowedMethods());
router.use('/api/v0.1/user', apiUser.routes(), apiUser.allowedMethods());


module.exports = router;
