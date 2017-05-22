const indexPage = async (ctx) => {
  const title = '主页';
  if (!ctx.session.login) {
    ctx.redirect('/login');
    return false;
  }
  await ctx.render('index', {
    title,
  });
  return true;
};


const loginPage = async (ctx) => {
  console.log('ddd');
  const title = '主页';
  await ctx.render('index', {
    title,
  });
  return true;
};

module.exports = {
  indexPage,
  loginPage,
};
