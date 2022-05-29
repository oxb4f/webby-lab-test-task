import { readFile } from "fs/promises";

export class MoviesController {
  constructor({ moviesUseCase }) {
    this.moviesUseCase = moviesUseCase;
  }

  createMovie = async (req, res) => {
    const movie = await this.moviesUseCase.createMovie(req.body);

    res.json({ data: movie.unmarshall(), status: 1 });
  };

  deleteMovieById = async (req, res) => {
    const numberOfDeleted = await this.moviesUseCase.deleteMovieById(
      req.params,
    );

    res.json({ status: numberOfDeleted ? 1 : 0 });
  };

  updateMovieById = async (req, res) => {
    const movie = await this.moviesUseCase.updateMovieById({
      movieId: req.params.movieId,
      ...req.body,
    });

    res.json({ data: movie.unmarshall(), status: 1 });
  };

  getMovieById = async (req, res) => {
    const movie = await this.moviesUseCase.getMovieById(req.params);

    res.json({ data: movie.unmarshall(), status: 1 });
  };

  getMovies = async (req, res) => {
    const movies = await this.moviesUseCase.getMovies(req.query);

    res.json({
      data: movies.map((movie) => movie.unmarshall()),
      meta: { total: movies.length },
      status: 1,
    });
  };

  importMovies = async (req, res) => {
    const rawMovies = (await readFile(req.file.path))
      .toString()
      .trim()
      .split("\n")
      .concat("");

    const moviesData = [];

    for (let i = 0; i < rawMovies.length; i++) {
      if (rawMovies[i] === "") {
        moviesData.push({
          title: rawMovies[i - 4].split(": ").pop(),
          year: Number(rawMovies[i - 3].split(": ").pop()),
          format: rawMovies[i - 2].split(": ").pop(),
          actors: rawMovies[i - 1].split(": ").pop().split(", "),
        });
      }
    }

    const movies = await this.moviesUseCase.createMovies(moviesData);

    res.json({
      data: movies.map((movie) => movie.unmarshall()),
      meta: { imported: movies.length, total: movies.length },
      status: 1,
    });
  };
}
