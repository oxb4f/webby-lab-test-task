import Joi from "joi";
import { MovieFormat } from "../../../domain/index.js";

export const updateMovieSchema = Joi.object({
  title: Joi.string().min(1).max(128),
  year: Joi.number().integer().min(1800).max(2500),
  format: Joi.string().equal(
    MovieFormat.VHS,
    MovieFormat.DVD,
    MovieFormat.BLURAY,
  ),
  actors: Joi.array().items(Joi.string().min(1).max(128)).min(0).max(128),
});
