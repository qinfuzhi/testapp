'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;

  const Goods = app.model.define('goods', {
    id: { type: INTEGER(20), primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), allowNull: false, defaultValue: '', comment: '产品名称', unique: true },
    order_num: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '订单数' },
    praise: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '订单数' },
    price: { type: INTEGER, allowNull: false, comment: '产品价格' },
    un_price: { type: INTEGER, allowNull: false, comment: '产品划线价格' },
    image: { type: STRING, allowNull: false, defaultValue: '', comment: '产品图片' },
    lable: { type: STRING, allowNull: true, defaultValue: '', comment: '产品标签' },
    stock: { type: INTEGER, allowNull: true, defaultValue: 0, comment: '库存' },
    state: { type: INTEGER(5), allowNull: false, defaultValue: 10, comment: '产品状态' },
    user_id: { type: INTEGER(20), allowNull: true, comment: '所属用户id' },
    category_id: { type: INTEGER(20), allowNull: true, comment: '分类id' },
    created_at: DATE,
    updated_at: DATE,
  });
  return Goods;
};
