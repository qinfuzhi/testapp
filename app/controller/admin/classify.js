'use strict';

const Controller = require('egg').Controller;
class ClassifyController extends Controller {
  // 用户列表页面
  async indexPage() {
    const { ctx } = this;
    // 获取页码和条数

    const data = await ctx.page('Classify', {}, {});
    console.log(data);
    await ctx.renderTemplate({
      title: '分类列表',
      tempType: 'table',
      table: {
        // 按钮
        buttons: {
          // 新增
          add: '/admin/classify/create',
        },
        columns: [{
          title: '分类名称',
          fixed: 'left',
          render(item) {
            const image = item.image ? item.image : '/public/assets/img/profiles/avatar-03.jpg';
            return `
            <h2 class="table-avatar">
              <a href="profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="${image}" alt="User Image"></a>
              <a href="profile.html">${item.name}<span>#${item.id}</span></a>
            </h2>
            `;
          },
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
              return `/admin/classify/edit/${id}`;
            },
            delete(id) {
              return `/admin/classify/delete/${id}`;
            },
          },
        }],
      },
      data,
    });
  }
  // 创建分类:表单
  async createPage() {
    const { ctx } = this;
    // await ctx.render('admin/manager/create.html');
    await ctx.renderTemplate({
      title: '创建分类',
      tempType: 'form',
      form: {
        // 提交地址
        action: '/admin/classify/create',
        fields: [{
          label: '店铺分类名称',
          type: 'text',
          name: 'name',
          placeholder: '店铺分类名称',
        }, {
          label: '分类图标',
          type: 'file',
          name: 'image',
          placeholder: '店铺分类图标',
        }],
      },
      successUrl: '/admin/classify',
    });
  }
  // 创建分类逻辑
  async create() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    console.log(data);
    this.ctx.validate({
      name: {
        type: 'string',
        required: true,
        desc: '分类名称',
      },
      image: {
        type: 'string',
        required: true,
        desc: '分类图标',
      },
    });
    const res = await app.model.Classify.findOne({
      where: {
        name: data.name,
      },
    });
    console.log(res);
    if (res) {
      return ctx.apiFail(400, '该分类名称已经存在');
    }
    const classify = await app.model.Classify.create(data);
    ctx.apiSuccess(classify);
  }
  // 编辑分类页面
  async editPage() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    let data = await app.model.Classify.findOne({
      where: { id },
    });
    data = JSON.parse(JSON.stringify(data));
    if (!data) {
      return await ctx.pageFail('该记录不存在');
    }
    await ctx.renderTemplate({
      id,
      title: '修改分类',
      tempType: 'form',
      form: {
        action: '/admin/classify/edit/' + id,
        fields: [{
          label: '分类名称',
          type: 'text',
          name: 'name',
          placeholder: '分类名称',
        }, {
          label: '分类图标',
          type: 'file',
          name: 'image',
          placeholder: '分类图标',
        }],
        data,
      },
      successUrl: '/admin/classify',
    });
  }
  // 编辑分类逻辑
  async eidt() {
    const { app, ctx } = this;
    const { id } = ctx.params;
    const { name } = ctx.request.body;
    // 验证码数据
    this.ctx.validate({
      name: {
        type: 'string',
        required: true,
        desc: '分类名',
      },
    });

    // 判断id是否存在
    const classify = await app.model.Classify.findOne({
      where: { id } });
    if (!classify) {
      return ctx.pageFail('该记录不存在');
    }
    // 用户名是否被使用
    const Op = app.Sequelize.Op;
    const res = await app.model.Classify.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        name,
      },
    });
    console.log(res);
    if (res) {
      return ctx.apiFail('改分类名称已经存在');
    }
    // 更新用户数据
    classify.name = name;
    ctx.apiSuccess(await classify.save());
  }

  // 删除用户
  async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    await app.model.Classify.destroy({
      where: {
        id,
      },
    });
    ctx.toast('删除成功', 'success');
    ctx.redirect('/admin/classify');
  }
}

module.exports = ClassifyController;
