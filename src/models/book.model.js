'use strict';

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      langue: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Authors",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "Books",
      timestamps: true,
    }
  );

  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      foreignKey: "author_id",
      as: "author",
    });

    Book.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });

    Book.hasMany(models.BookImage, {
      foreignKey: "book_id",
      as: "images",
      onDelete: "CASCADE",
    });
  };

  return Book;
};