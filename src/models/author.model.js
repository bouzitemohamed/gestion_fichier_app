'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Author = sequelize.define(
    "Author",
    {
      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      nationality: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories", // must match table name
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "Authors",
      timestamps: true,
    }
  );

  Author.associate = (models) => {
    Author.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  };

  return Author;
};