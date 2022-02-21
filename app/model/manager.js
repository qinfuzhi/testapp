'use strict';
const crypto = require('crypto');

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;

  const Manager = app.model.define('manager', {
    id: {
      type: INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '用户ID',
    },
    username: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '管理员账户',
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '管理员密码',
      set(val) {
        const hmac = crypto.createHash('sha256', app.config.crypto.secret);
        hmac.update(val);
        const hash = hmac.digest('hex');
        this.setDataValue('password', hash);
      },
    },
    created_at: {
      type: DATE,
      get() {
        const val = this.getDataValue('created_at');
        return (new Date(val)).getTime();
        // return app.formatTime(val);
      },
    },
    updated_at: {
      type: DATE,
      get() {
        const val = this.getDataValue('created_at');
        return (new Date(val)).getTime();
      },
    },
  });
  return Manager;
};
