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


module.exports = router;
