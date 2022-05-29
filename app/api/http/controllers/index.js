import { MoviesController } from "./movies.controller.js";
import { SessionsController } from "./sessions.controller.js";
import { UsersController } from "./users.controller.js";
import {
  usersUseCase,
  sessionsUseCase,
  moviesUseCase,
} from "../../../use-cases";

export const moviesController = new MoviesController({
  moviesUseCase: moviesUseCase,
});
export const sessionsController = new SessionsController({
  sessionsUseCase: sessionsUseCase,
});
export const usersController = new UsersController({ usersUseCase });
