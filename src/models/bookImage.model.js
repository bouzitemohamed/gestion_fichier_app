'use strict';

module.exports = (sequelize, DataTypes) => {
  const BookImage = sequelize.define(
    "BookImage",
    {
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Books",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "BookImages",
      timestamps: true,
    }
  );

  BookImage.associate = (models) => {
    BookImage.belongsTo(models.Book, {
      foreignKey: "book_id",
      as: "book",
    });
  };

  return BookImage;
};