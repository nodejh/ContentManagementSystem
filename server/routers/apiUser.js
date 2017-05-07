// user api
const router = require('koa-router')();
const apiUser = require('../controllers/apiUser');


/**
 * get message code
 */
router.get('/getCode', apiUser.getCode);
// router.post('/user', api.testPost);


module.exports = router;
