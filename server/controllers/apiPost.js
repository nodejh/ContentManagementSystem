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
    result.message = '获取任务列表成功';
    result.success = true;
    result.list = postList;
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = exception.message || '获取任务列表失败，请重试';
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
    result.message = '获取任务列表成功';
    result.success = true;
    result.list = postList;
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = exception.message || '获取任务列表失败，请重试';
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
    result.message = '获取任务列表成功';
    result.success = true;
    result.post = post[0];
  } catch (exception) {
    console.log('exception: ', exception);
    result.message = exception.message || '获取任务列表失败，请重试';
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
};
