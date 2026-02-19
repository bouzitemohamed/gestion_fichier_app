module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('user_sessions', 'createdAt', 'created_at');
    await queryInterface.renameColumn('user_sessions', 'updatedAt', 'updated_at');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('user_sessions', 'created_at', 'createdAt');
    await queryInterface.renameColumn('user_sessions', 'updated_at', 'updatedAt');
  }
};