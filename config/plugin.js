'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 导入跨域文件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 数据库模型库
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 数据验证库
  valparams: {
    enable: true,
    package: 'egg-valparams',
  },
  // 模版渲染插件
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
};
