'use strict';
module.exports = (option, app) => {
  async function errorHandler(ctx, next) {
    try {
      await next();
      // 404 处理
      if (ctx.status === 404 && !ctx.body) {
        ctx.body = {
          msg: 'fail',
          data: '404 错误',
        };
      }
    } catch (error) {
      // 抛出异常框架做记录
      app.emit('error', error, ctx);
      // const status = error.status || 500;
      // const err = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : error.message;
      // ctx.status = error.status;
      // // if(error.status === 500) {

      // // }
      // // eslint-disable-next-line no-empty
      ctx.body = {
        msg: 'fail',
        data: error,
      };
    }
  }
  return errorHandler;
};
