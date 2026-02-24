const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} = require('../services/author.service');

/**
 * CREATE
 */
async function createAuthorController(body) {
  try {
    return await createAuthor(body);
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * GET ALL
 */
async function getAllAuthorsController() {
  try {
    return await getAllAuthors();
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * GET BY ID
 */
async function getAuthorByIdController(id) {
  try {
    return await getAuthorById(id);
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * UPDATE
 */
async function updateAuthorController(id, body) {
  try {
    return await updateAuthor(id, body);
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * DELETE
 */
async function deleteAuthorController(id) {
  try {
    return await deleteAuthor(id);
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = {
  createAuthorController,
  getAllAuthorsController,
  getAuthorByIdController,
  updateAuthorController,
  deleteAuthorController
};