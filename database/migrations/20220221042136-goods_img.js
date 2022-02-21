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
    return queryInterface.createTable('goods_img', {
      id: { type: INTEGER(20), primaryKey: true, autoIncrement: true },
      url: { type: STRING(50), allowNull: false, defaultValue: '', comment: '图片地址', unique: true },
      sort: { type: INTEGER, allowNull: false, comment: '图片排序', unique: true },
      goods_id: { type: INTEGER(20), allowNull: true, comment: '所属商品id' },
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
    await queryInterface.dropTable('goods_img');
  },
};
