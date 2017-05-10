// user api
const router = require('koa-router')();
const apiPost = require('../controllers/apiPost');


router.post('/insert', apiPost.insert);
router.get('/list', apiPost.list);
router.get('/myList', apiPost.myList);
router.get('/detail/:id', apiPost.detailById);
router.post('/join', apiPost.join);
router.post('/isJoin', apiPost.isJoin);
router.post('/sign', apiPost.sign);
router.get('/users/:id', apiPost.users);
router.get('/myJoin', apiPost.myJoin);
router.get('/signList/:id', apiPost.signList);


module.exports = router;
