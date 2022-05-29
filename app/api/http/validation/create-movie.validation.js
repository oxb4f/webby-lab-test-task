import Joi from "joi";
import { MovieFormat } from "../../../domain/index.js";

export const createMovieSchema = Joi.object({
  title: Joi.string().min(1).max(128).required(),
  year: Joi.number().integer().min(1800).max(2500).required(),
  format: Joi.string()
    .equal(MovieFormat.VHS, MovieFormat.DVD, MovieFormat.BLURAY)
    .required(),
  actors: Joi.array()
    .items(Joi.string().min(1).max(128))
    .min(0)
    .max(128)
    .required(),
});
