'use strict';
const { DataTypes } = require('sequelize');
const User=require("./user.model");
module.exports = (sequelize) => {
  const UserSessions = sequelize.define('UserSessions', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    refresh_token_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    user_agent: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    ip_address: {
      type: DataTypes.STRING,
      allowNull: true,
    }

  }, {
    tableName: 'user_sessions',
    timestamps: true,
    underscored: true,
  });
    UserSessions.associate = (models) => {
    UserSessions.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };
  return UserSessions;
};