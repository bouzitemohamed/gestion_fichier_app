const sequelize = require('../config/db');
const Category = require('../models/category.model')(sequelize);

// CREATE
async function createCategory(name) {
  if (!name) throw new Error("Category name is required");

  return await Category.create({ name });
}

// GET BY ID
async function getCategoryById(id) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found");

  return category;
}

// GET ALL
async function getAllCategories() {
  return await Category.findAll({
    order: [["id", "DESC"]],
  });
}

// UPDATE
async function updateCategory(id, name) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found");

  if (name) category.name = name;

  await category.save();
  return category;
}

// DELETE
async function deleteCategory(id) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found");

  await category.destroy();
  return { message: "Category deleted successfully" };
}

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};