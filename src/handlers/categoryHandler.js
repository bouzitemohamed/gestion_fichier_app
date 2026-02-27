const authMiddleware = require("../middlewares/authMiddleware");

const {
  createCategoryController,
  getCategoryByIdController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/category.Controller");

const categoryHandler = async (event) => {
  try {
    const method = event.requestContext.http.method;
    const pathParams = event.pathParameters || {};
    const id = pathParams.id;

    // Protect all routes except maybe GET ALL (you decide)
    const auth = await authMiddleware(event);
    if (auth.error) {
      return {
        statusCode: auth.statusCode,
        body: JSON.stringify({ error: auth.error }),
      };
    }

    let result;

    switch (method) {

      // CREATE
      case "POST":
        const createBody = JSON.parse(event.body);
        result = await createCategoryController(createBody);
        return {
          statusCode: 201,
          body: JSON.stringify(result),
        };

      // GET ONE
      case "GET":
        if (id) {
          result = await getCategoryByIdController(id);
        } else {
          result = await getAllCategoriesController();
        }

        return {
          statusCode: 200,
          body: JSON.stringify(result),
        };

      // UPDATE
      case "PUT":
        const updateBody = JSON.parse(event.body);
        result = await updateCategoryController(id, updateBody);
        return {
          statusCode: 200,
          body: JSON.stringify(result),
        };

      // DELETE
      case "DELETE":
        result = await deleteCategoryController(id);
        return {
          statusCode: 200,
          body: JSON.stringify(result),
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = { categoryHandler };