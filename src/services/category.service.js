const sequelize = require('../config/db');
const Category = require('../models/category.model')(sequelize);

async function createCategory(name) {
  if (!name) throw new Error("Category name is required");

  const category = await Category.create({ name });
  return category;
}

module.exports = {
  createCategory,
};