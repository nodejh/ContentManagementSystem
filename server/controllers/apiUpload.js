const path = require('path');
const uploadFile = require('./../utils/uploadFile').uploadFile;


const upload = async (ctx) => {
  let result = { success: false, message: '上传文件失败' };
  // TODO session
  // if (ctx.session.user && ctx.session.user.id) {
  //   result.isLogin = false;
  //   ctx.body = result;
  //   return false;
  // }
  const serverFilePath = path.join(__dirname, './../static/upload');
  result = await uploadFile(ctx, {
    fileType: 'album', // common or album
    path: serverFilePath,
  });
  console.log('result: ', result);
  ctx.body = result;
  return true;
};


module.exports = {
  upload,
};
