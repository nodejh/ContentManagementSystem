const { query } = require('./../utils/mysql');

const list = async (ctx) => {
  // if (!ctx.session.login) {
  //   ctx.body = { success: false, message: '未登陆!' };
  //   return false;
  // }
  try {
    const sql = 'select ' +
      'posts.id, posts.title, posts.description, posts.start_date, posts.end_date, posts.uid, posts.picture,' +
      'users.`name` ' +
      'from posts ' +
      'left join users ' +
      'on posts.uid = users.id ' +
      'order by id desc';
    const res = await query(sql);
    ctx.body = { success: true, list: res, message: 'query success!' };
  } catch (exception) {
    console.log('exception: ', exception.message);
    ctx.body = { success: false, list: [], message: exception.message || 'query failed!' };
  }
};


const deletePost = async (ctx) => {
  // if (!ctx.session.login) {
  //   ctx.body = { success: false, message: '未登陆!' };
  //   return false;
  // }
  try {
    const { id } = ctx.request.body;
    const sql = 'delete from posts where id = ?';
    await query(sql, [id]);
    ctx.body = { success: true, message: 'delete success!' };
  } catch (exception) {
    console.log('exception: ', exception.message);
    ctx.body = { success: false, message: 'delete failed!' };
  }
};


module.exports = {
  list,
  deletePost,
};
