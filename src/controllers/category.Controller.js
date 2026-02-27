const {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require('../services/category.service');

// CREATE
async function createCategoryController(body) {
  return await createCategory(body.name);
}

// GET BY ID
async function getCategoryByIdController(id) {
  return await getCategoryById(id);
}

// GET ALL
async function getAllCategoriesController() {
  return await getAllCategories();
}

// UPDATE
async function updateCategoryController(id, body) {
  return await updateCategory(id, body.name);
}

// DELETE
async function deleteCategoryController(id) {
  return await deleteCategory(id);
}

module.exports = {
  createCategoryController,
  getCategoryByIdController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
};