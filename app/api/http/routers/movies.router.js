import { Router } from "express";
import multer from "multer";
import path from "path";
import { asyncHandlerWrapperUtil } from "../utils";
import {
  authMiddleware,
  bodyValidationMiddleware,
  paramsValidationMiddleware,
  queryValidationMiddleware,
} from "../middlewares/index.js";
import {
  createMovieSchema,
  deleteMovieByIdSchema,
  getMovieByIdSchema,
  searchMoviesSchema,
  updateMovieSchema,
} from "../validation/index.js";

export class MoviesRouter {
  constructor({ moviesController }) {
    this.moviesController = moviesController;
  }

  init = () => {
    return new Router()
      .post(
        "/movies",
        authMiddleware,
        bodyValidationMiddleware(createMovieSchema),
        asyncHandlerWrapperUtil(this.moviesController.createMovie),
      )
      .delete(
        "/movies/:movieId",
        authMiddleware,
        paramsValidationMiddleware(deleteMovieByIdSchema),
        asyncHandlerWrapperUtil(this.moviesController.deleteMovieById),
      )
      .patch(
        "/movies/:movieId",
        authMiddleware,
        paramsValidationMiddleware(getMovieByIdSchema),
        bodyValidationMiddleware(updateMovieSchema),
        asyncHandlerWrapperUtil(this.moviesController.updateMovieById),
      )
      .get(
        "/movies/:movieId",
        authMiddleware,
        paramsValidationMiddleware(getMovieByIdSchema),
        asyncHandlerWrapperUtil(this.moviesController.getMovieById),
      )
      .get(
        "/movies",
        authMiddleware,
        queryValidationMiddleware(searchMoviesSchema),
        asyncHandlerWrapperUtil(this.moviesController.getMovies),
      )
      .post(
        "/movies/import",
        authMiddleware,
        multer({
          dest: path.join(process.cwd(), process.env.FILES_DIR),
        }).single("movies"),
        asyncHandlerWrapperUtil(this.moviesController.importMovies),
      );
  };
}
