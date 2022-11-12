const movie = require('express').Router();
const {
  getSavedMovies,
  createMovies,
  deleteMoviesById,
} = require('../controllers/movies');
const { createMoviesValidation, deleteMoviesByIdValidation } = require('../middlewares/movie-celebrate');

movie.get('/', getSavedMovies);
movie.post('/', createMoviesValidation, createMovies);
movie.delete('/:_id', deleteMoviesByIdValidation, deleteMoviesById);

module.exports = movie;
