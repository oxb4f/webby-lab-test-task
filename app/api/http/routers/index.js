import {
  moviesController,
  sessionsController,
  usersController,
} from "../controllers/index.js";
import { MoviesRouter } from "./movies.router.js";
import { UsersRouter } from "./users.router.js";
import { SessionsRouter } from "./sessions.router.js";

export const moviesRouter = new MoviesRouter({ moviesController });
export const usersRouter = new UsersRouter({ usersController });
export const sessionsRouter = new SessionsRouter({ sessionsController });
