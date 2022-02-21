'use strict';

const Controller = require('egg').Controller;
class GoodsController extends Controller {
  async indexPage() {
    const { ctx } = this;
    const data = await ctx.page('Goods');
    console.log(data);
    await ctx.renderTemplate({
      title: '商品列表',
      tempType: 'table',
      table: {
        // 按钮
        buttons: {
          // 新增
          add: '/admin/goods/create',
        },
        columns: [{
          title: '商品',
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
          key: 'category_id',
        }, {
          title: '所属用户',
          fixed: 'lefe',
          key: 'user_id',
        }, {
          title: '商品价格',
          fixed: 'lefe',
          key: 'price',
        }, {
          title: '商品库存',
          fixed: 'lefe',
          key: 'stock',
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
              return `/admin/goods/edit/${id}`;
            },
            delete(id) {
              return `/admin/goods/delete/${id}`;
            },
          },
        }],
      },
      data,
    });
  }
  // 创建商品页面
  async createPage() {
    const { ctx } = this;
    await ctx.renderTemplate({
      title: '创建商品',
      tempType: 'form',
      form: {
        // 提交地址
        action: '/admin/goods/create',
        fields: [{
          label: '商品名称',
          type: 'text',
          name: 'name',
          placeholder: '商品名称',
        }, {
          label: '用户id',
          type: 'text',
          name: 'user_id',
          placeholder: '用户id',
        }, {
          label: '商品库存',
          type: 'text',
          name: 'stock',
          default: 99,
          placeholder: '商品库存',
        }, {
          label: '商品分类',
          type: 'text',
          name: 'category_id',
          placeholder: '商品分类',
        }, {
          label: '商品价格',
          type: 'text',
          name: 'price',
          placeholder: '商品价格',
        }, {
          label: '划线价格',
          type: 'text',
          name: 'un_price',
          placeholder: '划线价格',
        }, {
          label: '商品图片',
          type: 'file',
          other: {
            model: 'goods_img',
            type: 'file',
            key: 'goods_id',
          },
        }],
      },
      successUrl: '/admin/goods',
    });
  }
  // 创建商品逻辑
  async create() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    this.ctx.validate({
      name: {
        type: 'string',
        required: true,
        desc: '商品名称',
      },
      user_id: {
        type: 'int',
        required: true,
        desc: '所属用户',
      },
      category_id: {
        type: 'int',
        required: true,
        desc: '商品分类id',
      },
      price: {
        type: 'int',
        required: true,
        desc: '商品价格',
      },
      un_price: {
        type: 'int',
        required: true,
        desc: '划线价格',
      },
    });

    if (await app.model.Goods.findOne({ where: { name: data.name } })) {
      return ctx.apiFail(400, '该分类名称已经存在');
    }
    const goods = await app.model.Goods.create(data);
    ctx.apiSuccess(goods);
  }
  // 编辑商品页面
  async editPage() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    let data = await app.model.Goods.findOne({
      where: { id },
    });
    data = JSON.parse(JSON.stringify(data));
    if (!data) {
      return await ctx.pageFail('该记录不存在');
    }
    await ctx.renderTemplate({
      id,
      title: '修改商品',
      tempType: 'form',
      form: {
        action: '/admin/goods/edit/' + id,
        fields: [{
          label: '商品名称',
          type: 'text',
          name: 'name',
          placeholder: '商品名称',
        }, {
          label: '用户id',
          type: 'text',
          name: 'user_id',
          placeholder: '用户id',
        }, {
          label: '商品库存',
          type: 'text',
          name: 'stock',
          default: 99,
          placeholder: '商品库存',
        }, {
          label: '商品分类',
          type: 'text',
          name: 'category_id',
          placeholder: '商品分类',
        }, {
          label: '商品价格',
          type: 'text',
          name: 'price',
          placeholder: '商品价格',
        }, {
          label: '划线价格',
          type: 'text',
          name: 'un_price',
          placeholder: '划线价格',
        }],
        data,
      },
      successUrl: '/admin/goods',
    });
  }
  // 编辑逻辑
  async eidt() {
    const { app, ctx } = this;
    const Goods = app.model.Goods;
    const { id } = ctx.params;
    const data = ctx.request.body;
    // 验证码数据
    this.ctx.validate({
      name: {
        type: 'string',
        required: true,
        desc: '商品名称',
      },
      user_id: {
        type: 'int',
        required: true,
        desc: '所属用户',
      },
      category_id: {
        type: 'int',
        required: true,
        desc: '商品分类id',
      },
      price: {
        type: 'int',
        required: true,
        desc: '商品价格',
      },
      un_price: {
        type: 'int',
        required: true,
        desc: '划线价格',
      },
    });

    // 判断id是否存在
    const goods = await app.model.Goods.findOne({
      where: { id } });
    if (!goods) {
      return ctx.pageFail('该记录不存在');
    }
    // 更新数据
    const res = await Goods.update(data, { where: { id } });
    console.log(res);
    ctx.apiSuccess(res);
  }
  // 删除逻辑
  async delete() {
    const id = this.ctx.params.id;
    await this.app.model.Goods.destroy({
      where: {
        id,
      },
    });
    this.ctx.toast('删除成功', 'success');
    this.ctx.redirect('/admin/goods');
  }
}

module.exports = GoodsController;
