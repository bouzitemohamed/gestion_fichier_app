'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,          
    }
  }, {
    tableName: 'categories', 
    timestamps: true,        
  });
  Category.associate = (models) => {
  Category.hasMany(models.Author, {
    foreignKey: "category_id",
    as: "authors",
  });
};
  return Category;
};