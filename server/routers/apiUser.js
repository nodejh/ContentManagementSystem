// user api
const router = require('koa-router')();
const apiUser = require('../controllers/apiUser');


router.get('/isLogin', apiUser.isLogin);
router.get('/getCode', apiUser.getCode);
router.post('/sign', apiUser.sign);
router.get('/logout', apiUser.logout);
router.post('/login', apiUser.login);
router.get('/info', apiUser.info);
router.post('/update', apiUser.update);


module.exports = router;
