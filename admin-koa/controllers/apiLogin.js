const account = require('./../config/config').account;


const login = async (ctx) => {
  try {
    const { userName, password } = ctx.request.body;
    if (userName === account.username && password === account.password) {
      ctx.session.login = true;
      ctx.body = { success: true, message: '登陆成功!' };
    } else {
      ctx.body = { success: false, message: '登陆失败，用户名或密码错误!' };
    }
  } catch (exception) {
    console.log('exception: ', exception.message);
    ctx.body = { success: false, message: 'delete failed!' };
  }
};


const logout = async (ctx) => {
  ctx.session = null;
  ctx.redirect('/login');
};

module.exports = {
  login,
  logout,
};
