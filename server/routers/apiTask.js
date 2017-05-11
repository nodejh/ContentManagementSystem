// user api
const router = require('koa-router')();
const apiTask = require('../controllers/apiTask');


router.post('/sign', apiTask.sign);
router.get('/list/:id', apiTask.list);
router.get('/signList/:id', apiTask.signList);


module.exports = router;
