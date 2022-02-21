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
    return queryInterface.createTable('manager', {
      id: { type: INTEGER(20), primaryKey: true, autoIncrement: true },
      username: { type: STRING(30), allowNull: false, defaultValue: '', comment: '管理员账户', unique: true },
      password: { type: STRING, allowNull: false, defaultValue: '', comment: '管理员密码' },
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
    await queryInterface.dropTable('manager');
  },
};
