import Joi from "joi";

export const getMovieByIdSchema = Joi.object({
  movieId: Joi.number().integer().min(1).max(100_000_000_000),
});
