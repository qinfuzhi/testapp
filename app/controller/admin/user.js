'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  // 用户列表
  async userListPage() {
    const { ctx } = this;
    // 获取页码和条数
    const data = await ctx.page('User', {}, {});
    await ctx.renderTemplate({
      title: '用户列表',
      tempType: 'table',
      table: {
        // 按钮
        buttons: {
          // 新增
          add: '/admin/user/create',
        },
        columns: [{
          title: '用户名',
          fixed: 'left',
          render(item) {
            const avatar = item.avatar ? item.avatar : '/public/assets/img/profiles/avatar-03.jpg';
            return `
            <h2 class="table-avatar">
              <a href="profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="${avatar}" alt="User Image"></a>
              <a href="profile.html">${item.username}<span>#${item.id}</span></a>
            </h2>
            `;
          },
        }, {
          title: '级别',
          fixed: 'left',
          key: 'level',
        }, {
          title: '手机号码',
          fixed: 'left',
          key: 'phone',
        }, {
          title: '用户状态',
          fixed: 'left',
          key: 'state',
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
              return `/admin/user/edit/${id}`;
            },
            delete(id) {
              return `/admin/user/delete/${id}`;
            },
          },
        }],
      },
      data,
    });
    // ctx.apiSuccess(data);
  }
  // 创建用户页面:表单
  async createPage() {
    const { ctx } = this;
    // await ctx.render('admin/manager/create.html');
    await ctx.renderTemplate({
      title: '创建用户',
      tempType: 'form',
      form: {
        // 提交地址
        action: '/admin/user/create',
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
        }, {
          label: '手机号',
          type: 'text',
          name: 'phone',
          placeholder: '手机号',
        }, {
          label: '用户头像',
          type: 'file',
          name: 'avatar',
        }],
      },
      successUrl: '/admin/user',
    });
  }
  // 创建用户
  async create() {
    const { ctx, app } = this;
    const { username } = ctx.request.body;
    const data = ctx.request.body;
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
      phone: {
        type: 'string',
        required: true,
        desc: '手机号',
      },
    });
    const res = await app.model.User.findOne({
      where: {
        username,
      },
    });
    if (res) {
      return ctx.apiFail(400, '用户已经存在');
    }
    // if (res) {
    //   ctx.apiFail(400, '管理员已经存在');
    // }
    const user = await app.model.User.create(data);
    ctx.apiSuccess(user);
    // ctx.toast('创建成功', 'success');
    // ctx.redirect('/admin/manager');
  }
  // 编辑用户页面
  async editPage() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    let data = await app.model.User.findOne({
      where: { id },
    });
    if (!data) {
      return await ctx.pageFail('该记录不存在');
    }

    data = JSON.parse(JSON.stringify(data));
    delete data.password;
    console.log(data);
    await ctx.renderTemplate({
      id,
      title: '修改用户',
      tempType: 'form',
      form: {
        action: '/admin/user/edit/' + id,
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
        }, {
          label: '手机号码',
          type: 'text',
          name: 'phone',
          placeholder: '手机号码',
        }, {
          label: '头像',
          type: 'file',
          name: 'avatar',
          placeholder: '手机号码',
        }],
        data,
      },
      successUrl: '/admin/user',
    });
  }
  // 编辑用户逻辑
  async eidt() {
    const { app, ctx } = this;
    console.log(ctx);
    // 验证码数据
    ctx.validate({
      id: {
        type: 'int',
        required: true,
        desc: '用户id',
      },
      username: {
        type: 'string',
        required: true,
        desc: '用户名称',
      },
      password: {
        type: 'string',
        desc: '用户密码',
      },
      phone: {
        type: 'int',
        required: true,
        desc: '用户手机号码',
      },
      avatar: {
        type: 'string',
        required: true,
        desc: '用户头像',
      },
    });
    const { id } = ctx.params;
    const data = ctx.request.body;
    // 判断用户是否存在
    const user = await app.model.User.findOne({
      where: { id } });
    if (!user) {
      return ctx.pageFail('该记录不存在');
    }
    // 用户名是否被使用
    const Op = app.Sequelize.Op;
    const res = await app.model.User.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        username: data.username,
      },
    });
    if (res) {
      return ctx.apiFail('该用户名称已经存在');
    }
    // 更新用户数据
    user.username = data.username;
    user.phone = data.phone;
    user.avatar = data.avatar;
    if (data.password) {
      user.password = data.password;
    }
    ctx.apiSuccess(await user.save());
  }

  // 删除用户
  async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    await app.model.User.destroy({
      where: {
        id,
      },
    });
    ctx.toast('删除成功', 'success');
    ctx.redirect('/admin/user');
  }
}

module.exports = UserController;
