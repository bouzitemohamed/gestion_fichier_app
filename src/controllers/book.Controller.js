const bookService = require("../services/book.service");

async function createBookController(body) {
  return await bookService.createBook(body);
}

async function getAllBooksController() {
  return await bookService.getAllBooks();
}

async function getBookByIdController(id) {
  return await bookService.getBookById(id);
}

async function updateBookController(id, body) {
  return await bookService.updateBook(id, body);
}

async function deleteBookController(id) {
  return await bookService.deleteBook(id);
}

module.exports = {
  createBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
};