'use strict';

const Controller = require('egg').Controller;
class ManagerController extends Controller {
  // 管理员列表
  async index() {
    const { ctx } = this;
    // 获取页码和条数
    const data = await ctx.page('Manager', {}, {});
    console.log(data);
    // await ctx.render('admin/manager/index.html', { data });
    await ctx.renderTemplate({
      title: '管理员列表',
      tempType: 'table',
      table: {
        // 按钮
        buttons: {
          // 新增
          add: '/admin/manager/create',
        },
        columns: [{
          title: '管理员',
          fixed: 'left',
          key: 'username',
        }, {
          title: '创建时间',
          fixed: 'center',
          width: 180,
          key: 'created_at',
        }, {
          title: '操作',
          width: 200,
          fixed: 'center',
          actions: {
            edit(id) {
              return `/admin/manager/edit/${id}`;
            },
            delete(id) {
              return `/admin/manager/delete/${id}`;
            },
          },
        }],
      },
      data,
    });
    // ctx.apiSuccess(data);
  }
  // 创建管理员表单页面
  async create() {
    const { ctx } = this;
    // await ctx.render('admin/manager/create.html');
    await ctx.renderTemplate({
      title: '创建管理员',
      tempType: 'form',
      form: {
        // 提交地址
        action: '/admin/manager',
        fields: [{
          label: '用户名',
          type: 'text',
          name: 'username',
          placeholder: '用户名',
        }, {
          label: '密码',
          type: 'text',
          name: 'password',
          placeholder: '密码',
        }],
      },
      successUrl: '/admin/manager',
    });
  }
  // 创建管理员
  async save() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
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
    const res = await app.model.Manager.findOne({
      where: {
        username,
      },
    });
    if (res) {
      return ctx.apiFail(400, '管理员已经存在');
    }
    // if (res) {
    //   ctx.apiFail(400, '管理员已经存在');
    // }
    const manager = await app.model.Manager.create({
      username, password,
    });
    ctx.apiSuccess(manager);
    // ctx.toast('创建成功', 'success');
    // ctx.redirect('/admin/manager');
  }
  // 查询管理员
  async find() {
    const { ctx, app } = this;
    const { username } = ctx.request.body;
    const manager = await app.model.Manager.findOne({
      where: {
        username,
      },
    });
    ctx.apiSuccess(manager);
  }
  // 删除管理员
  async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    await app.model.Manager.destroy({
      where: {
        id,
      },
    });
    ctx.toast('删除成功', 'success');
    ctx.redirect('/admin/manager');
  }
  //  ctx.redirect(`/admin/manger`)
  // 编辑管理员 后台
  async edit() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    let data = await app.model.Manager.findOne({
      where: { id },
    });
    if (!data) {
      return await ctx.pageFail('该记录不存在');
    }

    data = JSON.parse(JSON.stringify(data));
    delete data.password;
    await ctx.renderTemplate({
      id,
      title: '修改管理员',
      tempType: 'form',
      form: {
        action: '/admin/manager/' + id,
        fields: [{
          label: '用户名',
          type: 'text',
          name: 'username',
          placeholder: '用户名',
        }, {
          label: '密码',
          type: 'text',
          name: 'password',
          placeholder: '密码',
        }],
        data,
      },
      successUrl: '/admin/manager',
    });
  }
  // 更新逻辑
  async update() {
    const { ctx, app } = this;
    ctx.validate({
      id: {
        type: 'int',
        required: true,
      },
      username: {
        type: 'string',
        required: true,
        desc: '管理员账号',
      },
      password: {
        type: 'string',
        desc: '管理员密码',
      },
    });

    const id = ctx.params.id;
    const { username, password } = ctx.request.body;
    // 判断管理是否存在
    const manager = await app.model.Manager.findOne({ where: { id } });
    if (!manager) {
      return ctx.apiFail('该记录不存在');
    }
    if (username === manager.username) {
      ctx.toast('没有做任何修改');
      ctx.render('admin/manager');
    }
    // 用户名是否被使用
    const Op = app.Sequelize.Op;
    const res = await app.model.Manager.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        username,
      },
    });
    if (res) {
      return ctx.apiFail('该管理员名称已经存在');
    }
    // 更新数据
    manager.username = username;
    if (password) {
      manager.password = password;
    }
    ctx.apiSuccess(await manager.save());
  }
}

module.exports = ManagerController;
