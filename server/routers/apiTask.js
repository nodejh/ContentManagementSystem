// user api
const router = require('koa-router')();
const apiTask = require('../controllers/apiTask');


router.post('/add', apiTask.add);
router.get('/list/:id', apiTask.list);
router.get('/signList/:id', apiTask.signList);
router.get('/signListOfMyTask/:id', apiTask.signListOfMyTask);
router.post('/sign', apiTask.sign);
router.get('/today/:id', apiTask.today);
router.post('/comment', apiTask.comment);
router.get('/isTodayTaskSigned/:todayTaskId', apiTask.isTodayTaskSigned);


module.exports = router;
