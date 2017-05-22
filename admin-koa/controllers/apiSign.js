const { query } = require('./../utils/mysql');

const list = async (ctx) => {
  // if (!ctx.session.login) {
  //   ctx.body = { success: false, message: '未登陆!' };
  //   return false;
  // }
  const { taskId } = ctx.params;
  console.log('taskId: ', taskId);
  if (!taskId) {
    ctx.body = { success: false, list: [], message: '参数错误!' };
  }
  try {
    const sql = 'select ' +
      'sign.id, sign.`datetime`, sign.picture, sign.description, sign.`comment`, ' +
      'users.`name` ' +
      'from sign ' +
      'left join users ' +
      'on sign.uid=users.id ' +
      'where sign.tid=?';
    const res = await query(sql, [taskId]);
    ctx.body = { success: true, list: res, message: 'query success!' };
  } catch (exception) {
    console.log('exception: ', exception.message);
    ctx.body = { success: false, list: [], message: exception.message || 'query failed!' };
  }
};


const deleteSign = async (ctx) => {
  // if (!ctx.session.login) {
  //   ctx.body = { success: false, message: '未登陆!' };
  //   return false;
  // }
  try {
    const { id } = ctx.request.body;
    const sql = 'delete from sign where id = ?';
    await query(sql, [id]);
    ctx.body = { success: true, message: 'delete success!' };
  } catch (exception) {
    console.log('exception: ', exception.message);
    ctx.body = { success: false, message: 'delete failed!' };
  }
};


module.exports = {
  list,
  deleteSign,
};
