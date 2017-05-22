const { query } = require('./../utils/mysql');

const list = async (ctx) => {
  // if (!ctx.session.login) {
  //   ctx.body = { success: false, message: '未登陆!' };
  //   return false;
  // }
  const { postId } = ctx.params;
  console.log('postId: ', postId);
  if (!postId) {
    ctx.body = { success: false, list: [], message: '参数错误!' };
  }
  try {
    const sql = 'select * from tasks where pid=?';
    const res = await query(sql, [postId]);
    ctx.body = { success: true, list: res, message: 'query success!' };
  } catch (exception) {
    console.log('exception: ', exception.message);
    ctx.body = { success: false, list: [], message: exception.message || 'query failed!' };
  }
};

const deleteTask = async (ctx) => {
  // if (!ctx.session.login) {
  //   ctx.body = { success: false, message: '未登陆!' };
  //   return false;
  // }
  try {
    const { id } = ctx.request.body;
    const sql = 'delete from tasks where id = ?';
    await query(sql, [id]);
    ctx.body = { success: true, message: 'delete success!' };
  } catch (exception) {
    console.log('exception: ', exception.message);
    ctx.body = { success: false, message: 'delete failed!' };
  }
};


module.exports = {
  list,
  deleteTask,
};
