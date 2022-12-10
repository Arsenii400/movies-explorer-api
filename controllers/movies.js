const AlienMovieError = require('../errors/alien-movie-err');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const Movie = require('../models/movie');

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        next(new ValidationError('«Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteMoviesById = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Нет фильма с таким id');
    })
    .then((movie) => {
      if (String(movie.owner) !== req.user._id) {
        throw new AlienMovieError('Вы не можете удалить чужой фильм');
      }
      return Movie.findByIdAndDelete(req.params._id);
    })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Введён некорректный id фильма'));
      } else {
        next(err);
      }
    });
};

module.exports = { getSavedMovies, createMovies, deleteMoviesById };
