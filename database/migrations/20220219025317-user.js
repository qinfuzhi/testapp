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
    return queryInterface.createTable('user', {
      id: { type: INTEGER(20), primaryKey: true, autoIncrement: true },
      username: { type: STRING(30), allowNull: false, defaultValue: '', comment: '用户名', unique: true },
      nickname: { type: STRING, allowNull: false, defaultValue: '', comment: '用户昵称' },
      phone: { type: STRING(11), allowNull: false, comment: '用户手机号码' },
      password: { type: STRING, allowNull: false, defaultValue: '', comment: '用户密码' },
      avatar: { type: STRING, allowNull: true, defaultValue: '', comment: '头像' },
      coins: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '秀币' },
      ingot: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '秀宝' },
      value: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '秀力值' },
      // 身份说明:10为级别1,20为级别2....
      level: { type: INTEGER, allowNull: false, defaultValue: 10, comment: '用户级别' },
      shop_id: { type: INTEGER(20), allowNull: true, comment: '商铺id' },
      // 状态说明:10位正常状态 20为冻结状态 其他状态后期判断
      state: { type: INTEGER(5), allowNull: false, defaultValue: 10, comment: '用户状态' },
      pid: { type: STRING, allowNull: true, comment: '上级id拼接' },
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
    await queryInterface.dropTable('user');
  },
};
