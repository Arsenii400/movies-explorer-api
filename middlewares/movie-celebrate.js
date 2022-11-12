const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const method = (value, helper) => {
  const result = validator.isURL(value);
  if (!result) {
    return helper.message('URL должен быть валидным');
  } return value;
};

const createMoviesValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(method),
    trailerLink: Joi.string().required().custom(method),
    thumbnail: Joi.string().required().custom(method),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMoviesByIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

module.exports = { createMoviesValidation, deleteMoviesByIdValidation };
