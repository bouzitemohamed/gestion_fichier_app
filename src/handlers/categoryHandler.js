const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController } = require("../controllers/category.Controller");

const createCategoryHandler = async (event) => {
  try {
    
    const auth = await authMiddleware(event);

    if (auth.error) {
      return {
        statusCode: auth.statusCode,
        body: JSON.stringify({ error: auth.error }),
      };
    }

    
    const user = auth.user;

    const body = JSON.parse(event.body);
    const category = await createCategoryController(body, user);

    return {
      statusCode: 201,
      body: JSON.stringify(category),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

module.exports = { createCategoryHandler };