'use strict';
const { createCategoryController } = require('../controllers/category.Controller');

const createCategoryHandler = async (event) => {
  try {

    const body = JSON.parse(event.body);

    const category = await createCategoryController(body);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Category created successfully",
        category,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

module.exports = {
  createCategoryHandler,
};