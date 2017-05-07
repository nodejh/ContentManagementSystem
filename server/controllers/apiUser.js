const sendMessage = require('./../utils/sendMessage');


const getCode = async (ctx) => {
  const { phone } = ctx.request.query;
  // const options = {
  //   sms_free_sign_name: '乐学乐教',
  //   rec_num: phone,
  //   sms_template_code: 'SMS_8150325',
  //   sms_param: { code: '123456' },
  // };
  const params = {
    extend: '123456',
    sms_type: 'normal',
    sms_free_sign_name: '乐学乐教',
    rec_num: phone,
    sms_template_code: 'SMS_8150325',
    sms_param: {
      customer: 'Ray',
      code: '123456',
    },
  };
  console.log('phone: ', phone);
  const sendResult = sendMessage(params);
  console.log('sendResult: ', sendResult);
  ctx.body = {
    success: true,
    data: {
      code: 111,
    },
  };
};


module.exports = {
  getCode,
};
