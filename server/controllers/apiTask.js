const moment = require('moment');
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
 * add a task
 * @param ctx
 * @return {Promise.<boolean>}
 */
const add = async (ctx) => {
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
    result.message = '添加任务成功';
    result.success = true;
  } catch (exception) {
    result.message = exception.message || '添加任务失败，请重试';
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
      '`sign`.`comment`, ' +
      '`sign`.`description`, ' +
      '`users`.`name` ' +
      'from `sign` ' +
      'left join `users` on `sign`.uid = `users`.`id` ' +
      'where `sign`.tid = ? order by `sign`.id desc';
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


const signListOfMyTask = async (ctx) => {
  const result = { success: false, message: '获取打卡列表失败', isLogin: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.isLogin = true;
  try {
    const { id = null } = ctx.params;
    const userId = ctx.session.user.id;
    const sql = 'select ' +
      '`sign`.id, ' +
      '`sign`.uid, ' +
      '`sign`.tid, ' +
      '`sign`.picture, ' +
      '`sign`.`datetime`, ' +
      '`sign`.`comment`, ' +
      '`sign`.`description`, ' +
      '`users`.`name` ' +
      'from `sign` ' +
      'left join `users` on `sign`.uid = `users`.`id` ' +
      'left join `tasks` on `sign`.tid = `tasks`.`id` ' +
      'left join `posts` on `tasks`.pid = `posts`.`id` ' +
      'where `sign`.tid = ? and `posts`.uid = ? order by `sign`.id desc';
    const res = await query(sql, [id, userId]);
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
    console.log('values: ', values);
    const data = {
      uid: ctx.session.user.id,
      tid: values.tid,
      description: values.description,
      picture: values.picture,
    };
    const sql = 'insert into `sign` set ?';
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


const today = async (ctx) => {
  const result = { success: false, message: '', auth: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.auth = true;
  try {
    const { id = null } = ctx.params;
    const yesterday = new Date(moment().subtract(1, 'days').format());
    const tomorrow = new Date(moment().add(1, 'days').format());
    const sql = 'select * from tasks where pid = ? and datetime between ? and ?';
    const res = await query(sql, [id, yesterday, tomorrow]);
    console.log('res: ', res);
    result.message = '获取今日任务成功';
    result.task = res[0];
    result.success = true;
  } catch (exception) {
    result.message = exception.message || '获取今日任务失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


const comment = async (ctx) => {
  const result = { success: false, message: '', auth: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.auth = true;
  try {
    const { values } = ctx.request.body;
    console.log('values: ', values);
    const sql = 'update `sign` set comment = ? where id = ?';
    await query(sql, [values.comment, values.id]);
    result.message = '评论成功';
    result.success = true;
  } catch (exception) {
    result.message = exception.message || '评论失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


const isTodayTaskSigned = async (ctx) => {
  const result = { success: false, message: '', auth: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.auth = true;
  try {
    const { todayTaskId = null } = ctx.params;
    const userId = ctx.session.user.id;
    const sql = 'select id from `sign` where `uid` = ? and `tid` = ? and `datetime` > ? and `datetime` < ?';
    const yesterday = moment().subtract(1, 'days').format();
    const tomorrow = moment().add(1, 'days').format();
    console.log('userId :', userId);
    console.log('todayTaskId :', todayTaskId);
    console.log('yes: ', yesterday);
    console.log('tomorrow: ', tomorrow);
    const res = await query(sql, [userId, todayTaskId, yesterday, tomorrow]);
    console.log('res : ', res);
    if (res.length > 0) {
      result.isTodayTaskSigned = true;
    } else {
      result.isTodayTaskSigned = false;
    }
    result.message = '查询是否打卡成功';
    result.success = true;
  } catch (exception) {
    result.message = exception.message || '查询是否打卡失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


const signDelete = async (ctx) => {
  const result = { success: false, message: '删除打卡失败', isLogin: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.isLogin = true;
  try {
    const { id } = ctx.request.body;
    console.log('id: ', id);
    const sql = 'delete from sign where id = ?';
    await query(sql, [id]);
    result.message = '删除打卡成功';
    result.success = true;
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = exception.message || '删除打卡失败';
  } finally {
    ctx.body = result;
  }
  return true;
};


module.exports = {
  list,
  add,
  signList,
  sign,
  today,
  comment,
  signListOfMyTask,
  isTodayTaskSigned,
  signDelete,
};
