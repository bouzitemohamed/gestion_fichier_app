const { createCategory } = require('../services/category.service');

async function createCategoryController(body) {
  try {
    const  name  = body.name;

    const category = await createCategory(name);

    return category;
    
  } catch (error) {
    console.error(error);
    return {statusCode:400,error: error.message };
  }
}

module.exports = {
  createCategoryController,
};