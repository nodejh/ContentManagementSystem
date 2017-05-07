const sms = require('node-alidayu-sms').default;
const config = require('./../config/config').alidayu;


const sendMessage = params =>
  sms.send({
    appkey: config.appKey,
    appsecret: config.appSecret,
    params,
  });

module.exports = sendMessage;
