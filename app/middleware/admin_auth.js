'use strict';
module.exports = () => {
  async function adminAuth(ctx, next) {
    if (!ctx.session.auth) {
      ctx.toast('请先登陆', 'danger');
      return ctx.redirect('/admin/login');
    }
    await next();
    if (ctx.status === 404) {
      await ctx.pageFail('页面不存在');
    }
  }
  return adminAuth;
};
