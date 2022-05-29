import { UsersUseCase } from "./users.use-case.js";
import { SessionsUseCase } from "./sessions.use-case.js";
import { MoviesUseCase } from "./movies.use-case.js";
import {
  userRepository,
  movieRepository,
} from "../infrastructure/db/sqlite/repositories";

export const moviesUseCase = new MoviesUseCase({ movieRepository });
export const usersUseCase = new UsersUseCase({ userRepository });
export const sessionsUseCase = new SessionsUseCase({ userRepository });
