const { connect, client, updateMovieByID, updateMovieByTitle, findMovieByID, findMovieManyByTitle, findMovieByTitle, findMovies, createListing } = require('../DB')
const INITIAL_MOVIES = require('./movies.json')


let allMovies = []
let currentIndex = 0

async function getAllMovies() {
  const movies = await findMovies(client)
  return movies

}

async function getById(id) {
  const movies = await findMovieByID(client, id)
  return movies
}

async function getByTitle(title) {
  const movies = await findMovieByTitle(client, title)
  return movies
}

async function getManyByTitle(title) {
  const movies = await findMovieManyByTitle(client, title)
  return movies
}

async function createMovie({ title, img, synopsis, rating, year }) {
  const newMovie = {
    title,
    img,
    synopsis,
    rating,
    year,
  }
  await createListing(client, newMovie)
  return newMovie
}

async function updateMovie(id, { title, img, synopsis, rating, year }) {
  const movie = await getById(id)
  const newMovie = {
    title,
    img,
    synopsis,
    rating,
    year,
  }
  await updateMovieByID(client, movie._id, newMovie)


  return newMovie
}

async function deleteMovie(id) {
  const movie = await getById(id)

  if (movie) {

  }

  return movie
}


module.exports = { getAllMovies, getById, getByTitle, createMovie, updateMovie, deleteMovie, init }
