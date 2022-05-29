import { UseCaseError } from "./errors/index.js";

export class MoviesUseCase {
  constructor({ movieRepository }) {
    this.movieRepository = movieRepository;
  }

  createMovie = async ({ title, year, format, actors }) => {
    return this.movieRepository.createMovie({ title, year, format, actors });
  };

  createMovies = async (movies) => {
    return Promise.all(
      movies.map((movie) => this.movieRepository.createMovie(movie)),
    );
  };

  getMovieById = async ({ movieId }) => {
    const movie = await this.movieRepository.getMovieById({ movieId });
    if (!movie) {
      throw new UseCaseError("movieDoesNotExist");
    }

    return movie;
  };

  deleteMovieById = async ({ movieId }) => {
    return this.movieRepository.deleteMovieById({ movieId });
  };

  updateMovieById = async ({ movieId, title, year, format, actors }) => {
    const updatedMovie = await this.movieRepository.updateMovieById({
      movieId,
      title,
      year,
      format,
      actors,
    });
    if (!updatedMovie) {
      throw new UseCaseError("movieUpdateFiled");
    }

    return updatedMovie;
  };

  getMovies = async ({ actor, title, search, sort, order, limit, offset }) => {
    return this.movieRepository.getMovies({
      actor,
      title,
      search,
      sort,
      order,
      limit,
      offset,
    });
  };
}
