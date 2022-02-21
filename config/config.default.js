/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1643964765612_4518';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'adminAuth', 'adminSidebar' ];
  config.errorHandler = {
    enbale: true,
    // match: [ '/user/list', '/user/read' ],
    // ignore: [ '/user/list' ],
  };
  config.adminAuth = {
    enable: true,
    ignore: [ '/api', '/admin/login', '/admin/manager/create', '/admin/manager', '/admin/upload' ],
  };
  config.adminSidebar = {
    enable: true,
    ignore: [ '/api', '/admin/login', '/public' ],
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 关闭csrf 解决跨域问题
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH',
  };
  // 配置数据库链接
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '12341234',
    database: 'qqx',
    // 中国时区
    timezone: '+8:00',
    define: {
      //  取消数据库表名复数
      freezeTableName: true,
      // 自动写入时间戳
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      // deletedAt: 'deleted_time',
      // 所有驼峰命名格式化
      underscored: true,
    },
  };
  // 配置参数验证
  config.valparams = {
    locale: 'zh-cn',
    throwError: 'true',
  };
  // 模版渲染配置
  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  };
  // 数据加密crypto
  config.crypto = {
    secret: 'Z#fOGf$te4^J28l1Z&$#fXCNifv!ZHQnEG',
  };
  // 配置session
  config.session = {
    renew: true,
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000 * 30,
    httpOnly: true,
    encrypt: true,
  };
  // 配置文件上传
  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: [ '.xls', '.txt', '.jpg', '.JPG', '.png', '.PNG', '.gif', '.GIF', '.jpeg', '.JPEG' ], // 扩展几种上传的文件格式
  };
  return {
    ...config,
    ...userConfig,
  };
};
