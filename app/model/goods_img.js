'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const GoodsImg = app.model.define('goods_img', {
    id: { type: INTEGER(20), primaryKey: true, autoIncrement: true },
    url: { type: STRING(50), allowNull: false, defaultValue: '', comment: '图片地址', unique: true },
    sort: { type: INTEGER, allowNull: false, comment: '图片排序', unique: true },
    goods_id: { type: INTEGER(20), allowNull: true, comment: '所属商品id' },
    created_at: DATE,
    updated_at: DATE,
  });
  return GoodsImg;
};
