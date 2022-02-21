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
    return queryInterface.createTable('category', {
      id: { type: INTEGER(20), primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), allowNull: false, defaultValue: '', comment: '分类名称', unique: true },
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
    await queryInterface.dropTable('category');
  },
};
