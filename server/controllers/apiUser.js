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
  console.log('phoneValide: ', phoneValide);
  console.log('codeValide: ', codeValide);
  console.log('phone: ', phone);
  console.log('code: ', code);
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


const login = async (ctx) => {
  const result = { success: false, message: '' };
  const { phone, password } = ctx.request.body;
  try {
    const user = await query('select password, id from users where phone = ?', phone);
    if (user.length === 0) {
      result.message = '手机号不存在';
    } else if (user[0].password === password) {
      ctx.session.user = { phone, id: user[0].id };
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


module.exports = {
  getCode,
  sign,
  login,
};
