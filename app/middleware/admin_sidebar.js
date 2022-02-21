'use strict';
module.exports = () => {
  async function adminSidebar(ctx, next) {
    const menus = [
      {
        name: '主面板',
        icon: 'fe-home',
        url: '/admin',
      },
      {
        name: '用户管理',
        icon: 'fe-user-plus',
        url: '/admin/user',
      },
      {
        name: '店铺管理',
        icon: 'fe-user-plus',
        url: '/admin/shop',
      },
      {
        name: '订单管理',
        icon: 'fe-cart',
        url: '/admin/order',
      },
      {
        name: '产品管理',
        icon: 'fe-vector',
        url: '/admin/goods',
      },
      {
        name: '产品图片管理',
        icon: 'fe-vector',
        url: '/admin/goodsimg',
      },
      {
        name: '管理员管理',
        icon: 'fe-table',
        url: '/admin/manager',
      },
      {
        name: '店铺分类管理',
        icon: 'fe-table',
        url: '/admin/classify',
      },
    ];
    const data = menus.map(item => {
      if ((item.url === '/admin' && ctx.request.url === '/admin') || (ctx.request.url.startsWith(item.url) && ctx.request.url !== '/admin') && item.url !== '/admin') {
        item.active = 'active';
      }
      return item;
    });
    ctx.locals.sidebar = data;
    await next();
  }
  return adminSidebar;
};
