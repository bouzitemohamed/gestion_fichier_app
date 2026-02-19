'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
  },
  });
  User.associate = (models) => {
  User.hasMany(models.UserSessions, {
      foreignKey: 'user_id',
      as: 'sessions',
      onDelete: 'CASCADE'
    });
  };
  return User;
};


