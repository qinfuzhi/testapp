'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Classify = app.model.define('classify', {
    id: { type: INTEGER(20), primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), allowNull: false, defaultValue: '', comment: '店铺分类名称', unique: true },
    image: { type: STRING(50), allowNull: false, defaultValue: '', comment: '店铺分类图标', unique: true },
    created_at: {
      type: DATE,
      get() {
        const val = this.getDataValue('created_at');
        return (new Date(val)).getTime();
      },
    },
    updated_at: DATE,

  });
  return Classify;
};
