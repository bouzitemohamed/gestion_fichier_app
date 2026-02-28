const sequelize = require("../config/db");
const Book = require("../models/book.model")(sequelize, require("sequelize").DataTypes);
const BookImage = require("../models/bookImage.model")(sequelize, require("sequelize").DataTypes);

async function createBook(data) {
  const transaction = await sequelize.transaction();

  try {
    const { name, description, prix, langue, author_id, category_id, images } = data;

    const book = await Book.create(
      { name, description, prix, langue, author_id, category_id },
      { transaction }
    );

    if (images && images.length > 0) {
      const imageRows = images.map((img) => ({
        image_url: img,
        book_id: book.id,
      }));

      await BookImage.bulkCreate(imageRows, { transaction });
    }

    await transaction.commit();
    return book;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function getAllBooks() {
  return await Book.findAll({
    include: [{ model: BookImage, as: "images" }],
  });
}

async function getBookById(id) {
  return await Book.findByPk(id, {
    include: [{ model: BookImage, as: "images" }],
  });
}

async function updateBook(id, data) {
  const transaction = await sequelize.transaction();

  try {
    const book = await Book.findByPk(id);
    if (!book) throw new Error("Book not found");

    await book.update(data, { transaction });

    if (data.images) {
      await BookImage.destroy({ where: { book_id: id }, transaction });

      const imageRows = data.images.map((img) => ({
        image_url: img,
        book_id: id,
      }));

      await BookImage.bulkCreate(imageRows, { transaction });
    }

    await transaction.commit();
    return book;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function deleteBook(id) {
  const book = await Book.findByPk(id);
  if (!book) throw new Error("Book not found");

  await book.destroy();
  return true;
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};