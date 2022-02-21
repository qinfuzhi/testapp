'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  // 后台首页
  async indexPage() {
    await this.ctx.render('admin/home/index.html');
  }
  // 登陆页面
  async loginPage() {
    const { ctx } = this;
    let toast = ctx.cookies.get('toast', { encrypt: true });
    toast = toast ? JSON.parse(toast) : null;
    await ctx.render('admin/home/login.html', { toast });
  }
  // 登陆逻辑
  async login() {
    const { ctx, app } = this;
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        desc: '用户名',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
      },
    });
    const { username, password } = ctx.request.body;
    const manager = await app.model.Manager.findOne({
      where: {
        username,
      },
    });
    if (!manager) {
      ctx.throw(400, '用户不存在或者已经被禁用');
    }
    // 验证密码
    ctx.checkPassword(password, manager.password, app);
    // 记录在session中
    ctx.session.auth = manager;
    return ctx.apiSuccess('ok');
  }
  // 退出登陆
  async logout() {
    const { ctx } = this;
    ctx.session.auth = null;
    ctx.toast('退出登陆成功', 'success');
    ctx.redirect('/admin/login');
  }
}

module.exports = HomeController;
