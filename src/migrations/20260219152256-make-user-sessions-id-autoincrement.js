'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_sessions', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true, 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_sessions', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: false, 
    });
  }
};