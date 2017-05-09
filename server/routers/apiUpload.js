const router = require('koa-router')();
const upload = require('../controllers/apiUpload');

router.post('/', upload.upload);


module.exports = router;
