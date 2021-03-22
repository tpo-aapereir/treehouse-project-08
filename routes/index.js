const express = require('express')
const router = express.Router()
const Book = require('../models').Book
const Sequelize = require('sequelize')

/* from Treehouse workshop - Handler function to wrap each route.
* @param {*} cb
* Allows for errors to be passed to global error handling
*/
function asyncHandler (cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      // Forward error to the global error handler
      next(error)
    }
  }
}

// GET Home Page via a redirect
router.get('/', (req, res, next) => { res.redirect('/books') })

// GET Home Page and display the books
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll()
  res.render('index', { books, title: 'Books' })
}))

// get new book route, allowing entry of a new title
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render('new-book', { book: {}, title: 'New Book' })
}))

/* books is not a static variable, and will change. Posts new book to db
* try/catch block used here to log an error if needed
*/
router.post('/books/new', asyncHandler(async (req, res) => {
  let book
  try {
    book = await Book.create(req.body)
    res.redirect('/books')
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body)
      res.render('new-book', { book, errors: error.errors, title: 'New Book' })
    } else {
      console.log(error)
      throw error
    }
  }
}))

// GET bookid, will show detailed information of selected title and its property or render an error
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  if (book) {
    res.render('update-book', { book: book })
  } else {
    res.render('page-not-found')
  }
}))

/* POST books/:id - this will update the existing title that is selected
* built a 404 error into this route should one occurr when loading the page
* using a try/catch here as well to trigger an error if the required fields are left blank
*/
router.post('/books/:id', asyncHandler(async (req, res) => {
  let book
  try {
    book = await Book.findByPk(req.params.id)
    if (book) {
      await book.update(req.body)
      res.redirect('/books/')
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body)
      res.render('update-book', { book, title: 'Update Book', errors: error.errors })
      console.log(book)
    } else {
      throw error
    }
  }
}))

// DELETE an entry
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  await book.destroy()
  res.redirect('/books')
}))

module.exports = router
