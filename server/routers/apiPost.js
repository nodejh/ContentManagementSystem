// user api
const router = require('koa-router')();
const apiPost = require('../controllers/apiPost');


router.post('/insert', apiPost.insert);
router.get('/list', apiPost.list);
router.get('/detail/:id', apiPost.detailById);


module.exports = router;
