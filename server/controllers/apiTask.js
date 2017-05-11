const query = require('./../utils/mysql').query;


const list = async (ctx) => {
  const result = { success: false, message: '获取任务表失败', isLogin: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.isLogin = true;
  try {
    const { id = null } = ctx.params;
    const sql = 'select * from `tasks` where pid = ?';
    const res = await query(sql, [id]);
    result.message = '获取任务表成功';
    result.success = true;
    result.list = res;
  } catch (exception) {
    result.message = exception.message || '获取任务表失败';
  } finally {
    ctx.body = result;
  }
  return true;
};


/**
 * sign for a task
 * @param ctx
 * @return {Promise.<boolean>}
 */
const sign = async (ctx) => {
  const result = { success: false, message: '', auth: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.auth = true;
  try {
    const { values } = ctx.request.body;
    const data = {
      pid: values.pid,
      content: values.content,
    };
    const sql = 'insert into `tasks` set ?';
    await query(sql, [data]);
    result.message = '打卡成功';
    result.success = true;
  } catch (exception) {
    result.message = exception.message || '打卡失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


const signList = async (ctx) => {
  const result = { success: false, message: '获取打卡列表失败', isLogin: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.isLogin = true;
  try {
    const { id = null } = ctx.params;
    const sql = 'select ' +
      '`sign`.id, ' +
      '`sign`.uid, ' +
      '`sign`.tid, ' +
      '`sign`.picture, ' +
      '`sign`.`datetime`, ' +
      '`sign`.`description`, ' +
      '`users`.`name` ' +
      'from `sign` ' +
      'left join `users` on `sign`.uid = `users`.`id` ' +
      'where `sign`.pid = ? order by `sign`.id desc';
    const res = await query(sql, [id]);
    result.message = '获取打卡列表成功';
    result.success = true;
    result.signList = res;
  } catch (exception) {
    result.message = exception.message || '获取打卡列表成功';
  } finally {
    ctx.body = result;
  }
  return true;
};


module.exports = {
  list,
  sign,
  signList,
};
