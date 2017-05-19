const query = require('./../utils/mysql').query;


const insert = async (ctx) => {
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
      uid: ctx.session.user.id,
      title: values.title,
      description: values.description,
      start_date: new Date(values.startDate),
      end_date: new Date(values.endDate),
      picture: values.picture,
    };
    const sql = 'insert into posts set ?';
    await query(sql, [data]);
    result.message = '发布成功';
    result.success = true;
  } catch (exception) {
    result.message = exception.message || '发布失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


const list = async (ctx) => {
  const result = { success: false, message: '', auth: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.auth = true;
  try {
    const sql = 'select * from posts order by id desc';
    const postList = await query(sql);
    result.message = '获取活动列表成功';
    result.success = true;
    result.list = postList;
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = exception.message || '获取活动列表失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


const myList = async (ctx) => {
  const result = { success: false, message: '', auth: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.auth = true;
  try {
    const userId = ctx.session.user.id;
    const sql = 'select * from posts where uid = ? order by id desc';
    const postList = await query(sql, [userId]);
    result.message = '获取活动列表成功';
    result.success = true;
    result.list = postList;
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = exception.message || '获取活动列表失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


const myJoin = async (ctx) => {
  const result = { success: false, message: '', auth: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.auth = true;
  try {
    const userId = ctx.session.user.id;
    const sql = 'select * from `join` left join `posts` on `join`.pid = `posts`.id where `join`.uid = ? order by `join`.id desc';
    const postList = await query(sql, [userId]);
    result.message = '获取活动列表成功';
    result.success = true;
    result.list = postList;
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = exception.message || '获取活动列表失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


const detailById = async (ctx) => {
  const result = { success: false, message: '', isLogin: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.isLogin = true;
  const { id } = ctx.params;
  if (!id) {
    result.message = '参数错误';
    ctx.body = result;
    return false;
  }
  try {
    const sql = 'select * from posts where id = ?';
    const post = await query(sql, [id]);
    result.message = '获取活动列表成功';
    result.success = true;
    result.post = post[0];
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = exception.message || '获取活动列表失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


const join = async (ctx) => {
  const result = { success: false, message: '', isLogin: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.isLogin = true;
  const { id } = ctx.request.body;
  const userId = ctx.session.user.id;
  try {
    // 查询是否已经加入过了
    const select = 'select id from `join` where uid = ? and pid = ?';
    const resSelect = await query(select, [userId, parseInt(id, 10)]);
    if (resSelect.length > 0) {
      result.message = '您已经加入了，无需再次加入';
      ctx.body = result;
      return false;
    }

    const sql = 'insert into `join` set ?';
    await query(sql, [{ uid: userId, pid: parseInt(id, 10) }]);
    result.success = true;
    result.message = '加入成功';
    ctx.body = result;
    return true;
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = '加入失败，请重试';
    ctx.body = result;
  }
  return true;
};


/**
 * is join
 * @param ctx
 * @return {Promise.<boolean>}
 */
const isJoin = async (ctx) => {
  const result = { success: false, message: '您尚未加入', isJoin: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.isLogin = true;
  const { id } = ctx.request.body;
  const userId = ctx.session.user.id;
  try {
    // 查询是否已经加入过了
    const select = 'select id from `join` where uid = ? and pid = ?';
    const resSelect = await query(select, [userId, parseInt(id, 10)]);
    if (resSelect.length > 0) {
      result.message = '您已经加入了';
      result.isJoin = true;
    }
    result.success = true;
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = exception.message || '查询失败，请重试';
  }
  ctx.body = result;
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
    const data = {
      uid: ctx.session.user.id,
      pid: values.pid,
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


const users = async (ctx) => {
  const result = { success: false, message: '获取加入该活动的用户失败', isLogin: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.isLogin = true;
  try {
    const { id = null } = ctx.params;
    const sql = 'select * from `join` left join `users` on `join`.uid = `users`.`id` where `join`.pid = ?';
    const res = await query(sql, [id]);
    result.message = '获取加入该活动的用户成功';
    result.success = true;
    result.users = res;
  } catch (exception) {
    result.message = exception.message || '获取加入该活动的用户失败';
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
      '`sign`.pid, ' +
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


const deletePost = async (ctx) => {
  const result = { success: false, message: '删除活动失败', isLogin: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.isLogin = true;
  try {
    const { id } = ctx.request.body;
    console.log('id: ', id);
    const sql = 'delete from posts where id = ?';
    await query(sql, [id]);
    result.message = '删除活动成功';
    result.success = true;
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = exception.message || '删除活动失败';
  } finally {
    ctx.body = result;
  }
  return true;
};


module.exports = {
  insert,
  list,
  myList,
  detailById,
  join,
  isJoin,
  sign,
  users,
  myJoin,
  signList,
  deletePost,
};
