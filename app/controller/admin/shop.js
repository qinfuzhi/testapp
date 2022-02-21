'use strict';

const Controller = require('egg').Controller;
class ShopController extends Controller {
  async indexPage() {
    const { ctx } = this;
    const data = await ctx.page('Shop');
    console.log(data);
    await ctx.renderTemplate({
      title: '店铺列表',
      tempType: 'table',
      table: {
        // 按钮
        buttons: {
          // 新增
          add: '/admin/shop/create',
        },
        columns: [{
          title: '店铺',
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
          title: '所属分类',
          fixed: 'lefe',
          key: 'classify_id',
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
              return `/admin/shop/edit/${id}`;
            },
            delete(id) {
              return `/admin/shop/delete/${id}`;
            },
          },
        }],
      },
      data,
    });
  }
  // 创建店铺页面
  async createPage() {
    const { ctx } = this;
    await ctx.renderTemplate({
      title: '创建',
      tempType: 'form',
      form: {
        // 提交地址
        action: '/admin/shop/create',
        fields: [{
          label: '店铺名称',
          type: 'text',
          name: 'name',
          placeholder: '店铺名称',
        }, {
          label: '店铺手机',
          type: 'text',
          name: 'phone',
          placeholder: '店铺手机',
        }, {
          label: '用户id',
          type: 'text',
          name: 'user_id',
          placeholder: '用户id',
        }, {
          label: '店铺分类',
          type: 'text',
          name: 'classify_id',
          placeholder: '店铺分类',
        }],
      },
      successUrl: '/admin/shop',
    });
  }
  // 创建店铺逻辑
  async create() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    this.ctx.validate({
      name: {
        type: 'string',
        required: true,
        desc: '店铺名称',
      },
      user_id: {
        type: 'int',
        required: true,
        desc: '用户id',
      },
      classify_id: {
        type: 'int',
        required: true,
        desc: '店铺分类id',
      },
      phone: {
        type: 'string',
        required: true,
        desc: '店铺手机号码',
      },
    });

    if (await app.model.Shop.findOne({ where: { name: data.name } })) {
      return ctx.apiFail(400, '该分类名称已经存在');
    }
    const shop = await app.model.Shop.create(data);
    ctx.apiSuccess(shop);
  }
  // 编辑店铺页面
  async editPage() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    let data = await app.model.Shop.findOne({
      where: { id },
    });
    data = JSON.parse(JSON.stringify(data));
    if (!data) {
      return await ctx.pageFail('该记录不存在');
    }
    await ctx.renderTemplate({
      id,
      title: '修改店铺',
      tempType: 'form',
      form: {
        action: '/admin/shop/edit/' + id,
        fields: [{
          label: '店铺名称',
          type: 'text',
          name: 'name',
          placeholder: '店铺名称',
        }, {
          label: '店铺手机',
          type: 'text',
          name: 'phone',
          placeholder: '店铺手机',
        }, {
          label: '用户id',
          type: 'text',
          name: 'user_id',
          placeholder: '用户id',
        }, {
          label: '店铺分类',
          type: 'text',
          name: 'classify_id',
          placeholder: '店铺分类',
        }],
        data,
      },
      successUrl: '/admin/shop',
    });
  }
  // 编辑逻辑
  async eidt() {
    const { app, ctx } = this;
    const Shop = app.model.Shop;
    const { id } = ctx.params;
    const data = ctx.request.body;
    // 验证码数据
    this.ctx.validate({
      name: {
        type: 'string',
        required: true,
        desc: '店铺名称',
      },
      user_id: {
        type: 'int',
        required: true,
        desc: '用户id',
      },
      classify_id: {
        type: 'int',
        required: true,
        desc: '店铺分类id',
      },
      phone: {
        type: 'string',
        required: true,
        desc: '店铺手机号码',
      },
    });

    // 判断id是否存在
    const shop = await app.model.Shop.findOne({
      where: { id } });
    if (!shop) {
      return ctx.pageFail('该记录不存在');
    }
    // 用户名是否被使用
    const Op = app.Sequelize.Op;
    const resone = await app.model.Shop.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        name: data.name,
      },
    });
    if (resone) {
      return ctx.apiFail('改名称已经存在');
    }
    // 更新用户数据
    const res = await Shop.update(data, { where: { id } });
    console.log(res);
    ctx.apiSuccess(res);
  }
  // 删除逻辑
  async delete() {
    const id = this.ctx.params.id;
    await this.app.model.Shop.destroy({
      where: {
        id,
      },
    });
    this.ctx.toast('删除成功', 'success');
    this.ctx.redirect('/admin/shop');
  }
}

module.exports = ShopController;
