import { UserRepository } from "./user.repository.js";
import {
  MoviesRepository,
  SortType as MoviesSortType,
  OrderType as MoviesOrderType,
} from "./movie.repository.js";

export const movieRepository = new MoviesRepository();
export const userRepository = new UserRepository();

export { MoviesSortType, MoviesOrderType };
