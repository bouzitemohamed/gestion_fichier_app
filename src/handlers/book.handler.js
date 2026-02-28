const authMiddleware = require("../middlewares/authMiddleware");
const controller = require("../controllers/book.Controller");

const bookHandler = async (event) => {
  try {
    const method = event.requestContext.http.method;
    const id = event.pathParameters?.id;

    // Public Routes
    if (method === "GET" && !id) {
      const books = await controller.getAllBooksController();
      return { statusCode: 200, body: JSON.stringify(books) };
    }

    if (method === "GET" && id) {
      const book = await controller.getBookByIdController(id);
      return { statusCode: 200, body: JSON.stringify(book) };
    }

    // Protected Routes
    const auth = await authMiddleware(event);
    if (auth.error) {
      return { statusCode: auth.statusCode, body: JSON.stringify({ error: auth.error }) };
    }

    const body = JSON.parse(event.body || "{}");

    if (method === "POST") {
      const book = await controller.createBookController(body);
      return { statusCode: 201, body: JSON.stringify(book) };
    }

    if (method === "PUT") {
      const book = await controller.updateBookController(id, body);
      return { statusCode: 200, body: JSON.stringify(book) };
    }

    if (method === "DELETE") {
      await controller.deleteBookController(id);
      return { statusCode: 204, body: "" };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

module.exports = { bookHandler };