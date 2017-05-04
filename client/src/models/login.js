import request from './../utils/request';

/**
 * 判断用户是否登录
 * @return {Promise} 是否登录
 */
const isLogin = async () => request('/api/v0.1/isLogin');


/**
 * 退出登录
 * @return {Promise} 退出登录
 */
const logout = async () => request('/api/v0.1/logout');


/**
 * 登录操作
 * @param  {object}  payload 用户手机号和密码
 *                           { phone: "183333333", password: "111111" }
 * @return {Promise}         是否登录成功
 */
const login = async (payload) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request('/api/v0.1/login', options);
};


/**
 * 注册操作
 * @param  {object}  payload 用户手机号和密码和验证码
 *                           { phone, password, code }
 * @return {Promise}         是否注册成功
 */
const sign = async (payload) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request('/api/v0.1/sign', options);
};


export {
  isLogin,
  login,
  logout,
  sign,
};