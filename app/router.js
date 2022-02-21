'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.api.home.index);

  // 用户模块路由
  router.post('/user/list', controller.api.user.index);
  // 创建用户
  router.post('/user/create', controller.api.user.create);
  // 登陆
  // router.post('/user/login', controller.user.)

  // 后台模块
  // 图片上传模块
  router.post('/admin/upload', controller.admin.common.upload);

  // 一: 首页模块
  // 后台首页页面
  router.get('/admin', controller.admin.home.indexPage);
  // 管理员登陆页面
  router.get('/admin/login', controller.admin.home.loginPage);
  router.post('/admin/login', controller.admin.home.login);
  // 退出登陆逻辑
  router.get('/admin/logout', controller.admin.home.logout);
  // 创建管理员页面
  router.get('/admin/manager/create', controller.admin.manager.create);
  // 编辑管理员页面
  router.get('/admin/manager/edit/:id', controller.admin.manager.edit);
  // 创建管理员逻辑
  router.post('/admin/manager', controller.admin.manager.save);
  // 修改管理员逻辑
  router.post('/admin/manager/:id', controller.admin.manager.update);
  // 查询管理员
  router.post('/admin/manager/find', controller.admin.manager.find);
  // 管理员列表
  router.get('/admin/manager', controller.admin.manager.index);
  // 删除管理员
  router.get('/admin/manager/delete/:id', controller.admin.manager.delete);


  // 管理后台用户模块
  // 创建用户页面
  router.get('/admin/user/create', controller.admin.user.createPage);
  // 创建用户逻辑
  router.post('/admin/user/create', controller.admin.user.create);
  // 用户列表页面
  router.get('/admin/user', controller.admin.user.userListPage);
  // 修改用户页面
  router.get('/admin/user/edit/:id', controller.admin.user.editPage);
  // 修改用户逻辑
  router.post('/admin/user/edit/:id', controller.admin.user.eidt);
  // 删除用户
  router.get('/admin/user/delete/:id', controller.admin.user.delete);

  // 后台分类管理模块
  // 分类列表页面
  router.get('/admin/classify', controller.admin.classify.indexPage);
  // 创建分类页面
  router.get('/admin/classify/create', controller.admin.classify.createPage);
  // 创建分类逻辑
  router.post('/admin/classify/create', controller.admin.classify.create);
  // 修改分类页面
  router.get('/admin/classify/edit/:id', controller.admin.classify.editPage);
  // 修改分类逻辑
  router.post('/admin/classify/edit/:id', controller.admin.classify.eidt);
  // 删除分类
  router.get('/admin/classify/delete/:id', controller.admin.classify.delete);

  // 后台店铺管理
  // 列表页面
  router.get('/admin/shop', controller.admin.shop.indexPage);
  // 创建页面
  router.get('/admin/shop/create', controller.admin.shop.createPage);
  // 创建逻辑
  router.post('/admin/shop/create', controller.admin.shop.create);
  // 修改页面
  router.get('/admin/shop/edit/:id', controller.admin.shop.editPage);
  // 修改逻辑
  router.post('/admin/shop/edit/:id', controller.admin.shop.eidt);
  // 删除分类
  router.get('/admin/shop/delete/:id', controller.admin.shop.delete);

  // 商品模块
  // 列表页面
  router.get('/admin/goods', controller.admin.goods.indexPage);
  // 创建页面
  router.get('/admin/goods/create', controller.admin.goods.createPage);
  // 创建逻辑
  router.post('/admin/goods/create', controller.admin.goods.create);
  // 修改页面
  router.get('/admin/goods/edit/:id', controller.admin.goods.editPage);
  // 修改逻辑
  router.post('/admin/goods/edit/:id', controller.admin.goods.eidt);
  // 删除分类
  router.get('/admin/goods/delete/:id', controller.admin.goods.delete);

  // 商品图片模块
  // 列表页面
  router.get('/admin/goodsimg', controller.admin.goods.indexPage);
  // // 创建页面
  // router.get('/admin/goodsimg/create', controller.admin.goods.createPage);
  // // 创建逻辑
  // router.post('/admin/goodsimg/create', controller.admin.goods.create);
  // // 修改页面
  // router.get('/admin/goodsimg/edit/:id', controller.admin.goods.editPage);
  // // 修改逻辑
  // router.post('/admin/goodsimg/edit/:id', controller.admin.goods.eidt);
  // // 删除分类
  // router.get('/admin/goodsimg/delete/:id', controller.admin.goods.delete);
};
