// handlers/createAuthor.handler.js
const authMiddleware = require("../middlewares/authMiddleware");
const { getAuthorByIdController,getAllAuthorsController,createAuthorController,deleteAuthorController,updateAuthorController } = require("../controllers/author.Controller");

const createAuthorHandler = async (event) => {
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

    const author = await createAuthorController(body, user);

    return {
      statusCode: 201,
      body: JSON.stringify(author),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const getAuthorHandler = async (event) => {
  try {
    console.log(event);
    const id = event.pathParameters.id;
    
    const author = await getAuthorByIdController(Number(id));

    return {
      statusCode: 200,
      body: JSON.stringify(author),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const getAllAuthorsHandler = async () => {
  try {
    const authors = await getAllAuthorsController();

    return {
      statusCode: 200,
      body: JSON.stringify(authors),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const updateAuthorHandler = async (event) => {
  try {
    const auth = await authMiddleware(event);
    if (auth.error) {
      return {
        statusCode: auth.statusCode,
        body: JSON.stringify({ error: auth.error }),
      };
    }

    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);

    const updated = await updateAuthorController(id, body);

    return {
      statusCode: 200,
      body: JSON.stringify(updated),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const deleteAuthorHandler = async (event) => {
  try {
    const auth = await authMiddleware(event);
    if (auth.error) {
      return {
        statusCode: auth.statusCode,
        body: JSON.stringify({ error: auth.error }),
      };
    }

    const id = event.pathParameters.id;

    const result = await deleteAuthorController(id);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = { 
    updateAuthorHandler,
    getAllAuthorsHandler,
    deleteAuthorHandler,
    getAuthorHandler,
    createAuthorHandler
};