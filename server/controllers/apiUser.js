const sendMessage = require('./../utils/sendMessage');
const randomMSMCode = require('./../utils/random').randomMSMCode;
const query = require('./../utils/mysql').query;


const getCode = async (ctx) => {
  const result = { success: false, code: '', message: '' };
  try {
    const { phone } = ctx.request.query;
    const code = randomMSMCode(6);
    const params = {
      extend: '123456',
      sms_type: 'normal',
      sms_free_sign_name: '乐学乐教',
      rec_num: phone,
      sms_template_code: 'SMS_8150325',
      sms_param: {
        customer: 'Ray',
        code,
      },
    };
    const { result: sendResult } = await sendMessage(params);
    if (sendResult.err_code === '0') {
      ctx.session.user = { phone, code };
      result.success = true;
      result.code = code;
    }
  } catch (e) {
    result.message = e.message || '发送短信验证码失败，请重试';
  } finally {
    ctx.body = result;
  }
};


const sign = async (ctx) => {
  const result = { success: false, message: '' };
  const { phone, code, password } = ctx.request.body;
  const { phone: phoneValide, code: codeValide } = ctx.session.user;
  try {
    if (phone === phoneValide && code === codeValide) {
      const values = { phone, password };
      const sql = 'insert into users set ?';
      const insertRes = await query(sql, [values]);
      ctx.session.user.id = insertRes.insertId;
      result.success = true;
    } else {
      result.message = '验证码错误，请重试';
    }
  } catch (exception) {
    result.message = exception.message || '注册失败，请重试';
  } finally {
    ctx.body = result;
  }
};


/**
 * login
 * @param ctx
 * @return {Promise.<void>}
 */
const login = async (ctx) => {
  const result = { success: false, message: '' };
  const { phone, password } = ctx.request.body;
  try {
    const user = await query('select password, id from users where phone = ?', phone);
    if (user.length === 0) {
      result.message = '手机号不存在';
    } else if (user[0].password === password) {
      ctx.session.user = { phone, id: user[0].id };
      console.log('ctx.session.user: ', ctx.session.user);
      result.success = true;
    } else {
      result.success = false; // 密码错误
      result.message = '密码错误';
    }
  } catch (exception) {
    result.message = exception.message || '手机号或密码错误';
  } finally {
    ctx.body = result;
  }
};


/**
 * logout
 * @param ctx
 * @return {Promise.<void>}
 */
const logout = async (ctx) => {
  const result = { success: true, message: '退出登录成功' };
  ctx.session.user = null;
  ctx.body = result;
};


/**
 * check user if is login
 * @param ctx
 * @return {Promise.<void>}
 */
const isLogin = async (ctx) => {
  const result = { success: true, message: 'not login', isLogin: false };
  if (ctx.session.user && ctx.session.user.id) {
    result.isLogin = true;
  }
  ctx.body = result;
};


/**
 * 获取个人信息
 * @param ctx
 * @return {Promise.<boolean>}
 */
const info = async (ctx) => {
  const result = { success: false, message: '', auth: false };
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.auth = true;
  try {
    const { id } = ctx.session.user;
    const res = await query('select * from users where id = ?', [id]);
    if (res.length === 0) {
      result.message = '用户不存在';
    } else {
      result.info = res[0];
      result.success = true;
      result.message = '获取个人信息成功';
    }
  } catch (exception) {
    result.message = exception.message || '获取个人信息失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


/**
 * update
 * @param ctx
 * @return {Promise.<boolean>}
 */
const update = async (ctx) => {
  const result = { success: false, message: '', auth: false };
  const { values } = ctx.request.body;
  if (!(ctx.session.user && ctx.session.user.id)) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.auth = true;
  try {
    const { id } = ctx.session.user;
    const res = await query('update users set ? where id = ?', [values, id]);
    if (res.length === 0) {
      result.message = '用户不存在';
    } else {
      result.success = true;
      result.message = '更新个人信息成功';
    }
  } catch (exception) {
    result.message = exception.message || '更新个人信息失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


module.exports = {
  getCode,
  sign,
  login,
  info,
  logout,
  isLogin,
  update,
};
