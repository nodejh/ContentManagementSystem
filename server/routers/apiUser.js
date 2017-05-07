// user api
const router = require('koa-router')();
const apiUser = require('../controllers/apiUser');


router.get('/getCode', apiUser.getCode);
router.post('/sign', apiUser.sign);


module.exports = router;
