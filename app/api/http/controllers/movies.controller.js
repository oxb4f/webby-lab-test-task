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
    let isValid = true;

    for (let i = 0; i < rawMovies.length; i++) {
      if (rawMovies[i] === "") {
        let maybeTitle = rawMovies[i - 4]?.split(": ");
        if (!maybeTitle || maybeTitle[0] !== "Title" || maybeTitle.length < 2) {
          isValid = false;
          break;
        } else {
          maybeTitle = maybeTitle.pop();
        }

        let maybeYear = rawMovies[i - 3]?.split(": ");
        if (
          !maybeYear ||
          maybeYear[0] !== "Release Year" ||
          maybeYear.length < 2
        ) {
          isValid = false;
          break;
        } else {
          maybeYear = Number(maybeYear.pop());
          if (!Number.isFinite(maybeYear)) {
            isValid = false;
            break;
          }
        }

        let maybeFormat = rawMovies[i - 2]?.split(": ");
        if (
          !maybeFormat ||
          maybeFormat[0] !== "Format" ||
          maybeFormat.length < 2
        ) {
          isValid = false;
          break;
        } else {
          maybeFormat = maybeFormat.pop();
        }

        let maybeActors = rawMovies[i - 1]?.split(": ");
        if (
          !maybeActors ||
          maybeActors[0] !== "Stars" ||
          maybeActors.length < 2
        ) {
          isValid = false;
          break;
        } else {
          maybeActors = maybeActors.pop().split(", ");
        }

        moviesData.push({
          title: maybeTitle,
          year: maybeYear,
          format: maybeYear,
          actors: maybeActors,
        });
      }
    }

    if (!isValid) {
      return res.json({
        data: [],
        meta: { imported: 0, total: 0 },
        status: 0,
      });
    }

    const movies = await this.moviesUseCase.createMovies(moviesData);
    if (!movies) {
      return res.json({
        data: [],
        meta: { imported: 0, total: 0 },
        status: 0,
      });
    }

    return res.json({
      data: movies.map((movie) => movie.unmarshall()),
      meta: { imported: movies.length, total: movies.length },
      status: 1,
    });
  };
}
