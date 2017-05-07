/**
 * 随机短信验证码
 * @param {number} length   sms code length
 * @type {string}
 */
const randomMSMCode = (length) => {
  const res = [];
  for (let i = 0; i < length; i += 1) {
    res.push(parseInt(Math.random() * 10, 10));
  }
  return res.join('');
};


module.exports = {
  randomMSMCode,
};
