// user api
const router = require('koa-router')();
const apiTask = require('../controllers/apiTask');


router.post('/add', apiTask.add);
router.get('/list/:id', apiTask.list);
router.get('/signList/:id', apiTask.signList);


module.exports = router;
