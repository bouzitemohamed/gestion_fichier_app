const sequelize = require('../config/db');
const Author = require('../models/author.model')(sequelize);
const Category = require('../models/category.model')(sequelize);

/**
 * CREATE AUTHOR
 */
async function createAuthor(data) {
  const { name, description, nationality, category_id } = data;

  if (!name || !category_id)
    throw new Error("Name and category_id are required");

  // Check category exists
  const category = await Category.findByPk(category_id);
  if (!category) throw new Error("Category not found");

  const author = await Author.create({
    name,
    description,
    nationality,
    category_id
  });

  return author;
}

/**
 * GET ALL AUTHORS
 */
async function getAllAuthors() {
  return await Author.findAll();
}

/**
 * GET AUTHOR BY ID
 */
async function getAuthorById(id) {
  const author = await Author.findByPk(id);

  if (!author) throw new Error("Author not found");

  return author;
}

/**
 * UPDATE AUTHOR
 */
async function updateAuthor(id, data) {
  const author = await Author.findByPk(id);

  if (!author) throw new Error("Author not found");

  await author.update(data);

  return author;
}

/**
 * DELETE AUTHOR
 */
async function deleteAuthor(id) {
  const author = await Author.findByPk(id);

  if (!author) throw new Error("Author not found");

  await author.destroy();

  return { message: "Author deleted successfully" };
}

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
};