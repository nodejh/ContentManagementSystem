const getCode = async (ctx) => {
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
