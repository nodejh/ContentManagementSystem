// user api
const router = require('koa-router')();
const api = require('../controllers/apiUser');


/**
 * get message code
 */
router.get('/user', api.getCode);
// router.post('/user', api.testPost);


module.exports = router;
