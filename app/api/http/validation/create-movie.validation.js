import Joi from "joi";
import { MovieFormat } from "../../../domain/index.js";

export const createMovieSchema = Joi.object({
  title: Joi.string()
    .regex(/^[a-z]+\s?[a-z]+$/im)
    .min(1)
    .max(128)
    .required(),
  year: Joi.number().integer().min(1800).max(2022).required(),
  format: Joi.string()
    .equal(MovieFormat.VHS, MovieFormat.DVD, MovieFormat.BLURAY)
    .required(),
  actors: Joi.array()
    .items(
      Joi.string()
        .regex(/^[a-z -]+$/im)
        .min(1)
        .max(128),
    )
    .min(0)
    .max(128)
    .required(),
});
