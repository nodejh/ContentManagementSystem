const { query } = require('./../utils/mysql');

const list = async (ctx) => {
  try {
    const res = await query('select * from posts');
    ctx.body = { success: true, list: res, message: 'query success!' };
  } catch (exception) {
    console.log('exception: ', exception.message);
    ctx.body = { success: false, list: [], message: exception.message || 'query failed!' };
  }
};


module.exports = {
  list,
};
