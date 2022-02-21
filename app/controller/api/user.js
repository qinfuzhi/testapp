'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const data = this.ctx.request.body;
    console.log(data[1]);
    const res = await this.app.model.User.findAll();
    this.ctx.apiSuccess(res);
  }
  // 登陆
  // async login() {
  //   const data = this.ctx.request.body;
  //   this.ctx.validate({
  //
  //   })
  // }
  // 创建用户
  async create() {
    console.log(this.ctx.request.body);

    this.ctx.validate({
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
    const data = this.ctx.request.body;
    console.log(data);

    const res = await this.app.model.User.create(data);
    console.log(res);
    this.ctx.apiSuccess(res);
  }
}

module.exports = UserController;
