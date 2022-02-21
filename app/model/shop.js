'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Shop = app.model.define('shop', {
    id: { type: INTEGER(20), primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), allowNull: false, defaultValue: '', comment: '店铺名称', unique: true },
    state: { type: INTEGER, allowNull: false, defaultValue: 10, comment: '店铺状态' },
    phone: { type: STRING(11), allowNull: false, comment: '商品电话' },
    image: { type: STRING, allowNull: true, defaultValue: '', comment: '商铺图片' },
    describes: { type: STRING, allowNull: true, defaultValue: '', comment: '商家简介' },
    lable: { type: STRING, allowNull: true, defaultValue: '', comment: '商家自定标签' },
    address: { type: STRING, allowNull: true, defaultValue: '', comment: '商品地址' },
    logo: { type: STRING, allowNull: true, defaultValue: '', comment: '商铺logo' },
    balance: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '商铺余额' },
    score: { type: INTEGER, allowNull: false, defaultValue: 5, comment: '商铺评分' },
    classify_id: { type: INTEGER(20), allowNull: true, comment: '所属分类id' },
    user_id: { type: INTEGER(20), allowNull: true, comment: '所属用户id' },
    created_at: {
      type: DATE,
    //   get() {
    //     const val = this.getDataValue('created_at');
    //     return (new Date(val)).getTime();
    //   },
    },
    updated_at: DATE,

  });
  return Shop;
};
