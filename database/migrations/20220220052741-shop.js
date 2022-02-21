'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, DATE } = Sequelize;
    return queryInterface.createTable('shop', {
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
      created_at: DATE,
      updated_at: DATE,
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('shop');
  },
};
