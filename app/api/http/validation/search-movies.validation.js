import Joi from "joi";
import {
  MoviesOrderType,
  MoviesSortType,
} from "../../../infrastructure/db/sqlite/repositories";

export const searchMoviesSchema = Joi.object({
  actor: Joi.string().min(1).max(128),
  title: Joi.string().min(1).max(128),
  search: Joi.string().min(1).max(128),
  sort: Joi.string()
    .equal(MoviesSortType.ID, MoviesSortType.TITLE, MoviesSortType.YEAR)
    .default(MoviesSortType.ID),
  order: Joi.string()
    .equal(MoviesOrderType.DESC, MoviesOrderType.ASC)
    .default(MoviesOrderType.ASC),
  limit: Joi.number().integer().min(1).max(100_000_000_000).default(20),
  offset: Joi.number().integer().min(0).max(100_000_000_000).default(0),
});
