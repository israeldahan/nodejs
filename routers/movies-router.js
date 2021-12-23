const express = require('express')
const checkLegalID = require('../middleware/checkLegalID')

const {
  getMovies,
  getById,
  getByTitle,
  createMovie,
  upsertMovie,
  modifyMovie,
  deleteMovie,
} = require('../controllers/movies-controller')

const moviesRouter = express.Router()

moviesRouter.get('/', getMovies)
moviesRouter.get('/:id', checkLegalID, getById)
moviesRouter.get('/title/:title', getByTitle)
moviesRouter.post('/', createMovie)
moviesRouter.put('/', upsertMovie)
moviesRouter.patch('/:id', checkLegalID, modifyMovie)
moviesRouter.delete('/:id', checkLegalID, deleteMovie)

module.exports = moviesRouter
