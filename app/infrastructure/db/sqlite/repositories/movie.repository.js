import { ActorModel, MovieModel } from "../index.js";
import { Actor, Movie } from "../../../../domain/index.js";
import { Op } from "sequelize";

export const SortType = Object.freeze({
  ID: "id",
  TITLE: "title",
  YEAR: "year",
});

export const OrderType = Object.freeze({
  DESC: "DESC",
  ASC: "ASC",
});

export class MoviesRepository {
  createMovie = async ({ title, year, format, actors }) => {
    const movie = await MovieModel.create({ title, year, format });

    if (Array.isArray(actors)) {
      await movie.setActors(
        await ActorModel.bulkCreate(
          actors.map((actor) => {
            return { name: actor };
          }),
        ),
      );
    }

    return await MoviesRepository.toDomain(movie);
  };

  getMovieById = async ({ movieId }) => {
    const movie = await MovieModel.findByPk(movieId, { include: ActorModel });
    if (!movie) {
      return null;
    }

    return await MoviesRepository.toDomain(movie);
  };

  deleteMovieById = async ({ movieId }) => {
    return await MovieModel.destroy({ where: { id: movieId } });
  };

  updateMovieById = async ({ movieId, title, year, format, actors }) => {
    const movie = await MovieModel.findByPk(movieId);
    if (!movie) {
      return null;
    }

    movie.title = title ?? movie.title;
    movie.year = year ?? movie.year;
    movie.format = format ?? movie.format;

    if (Array.isArray(actors)) {
      await movie.setActors(
        await ActorModel.bulkCreate(
          actors.map((actor) => {
            return { name: actor };
          }),
        ),
      );
    }

    await movie.save();

    return await MoviesRepository.toDomain(movie);
  };

  getMovies = async ({ actor, title, search, sort, order, limit, offset }) => {
    console.log({ actor, title, search, sort, order, limit, offset });

    const query = {
      where: {},
      group: ["title"],
      order: [[sort, order]],
      offset,
      limit,
      subQuery: false,
      include: [
        {
          model: ActorModel,
          required: true,
          attributes: ["name"],
        },
      ],
    };

    if (title) {
      query.where.title = { [Op.like]: `%${title}%` };
    }
    if (actor || search) {
      if (actor) {
        query.where["$Actors.name$"] = { [Op.like]: `%${actor}%` };
      }
      if (search) {
        query.where[Op.or] = [
          { "$Actors.name$": { [Op.like]: `%${search}%` } },
          { title: { [Op.like]: `%${search}%` } },
        ];
      }
    }

    const movies = await MovieModel.findAll(query);

    return await Promise.all(
      movies.map((movie) => MoviesRepository.toDomain(movie)),
    );
  };

  static toDomain = async (movieModel) => {
    const actorsDomain = (await movieModel.getActors()).map((actor) =>
      Actor.create(actor),
    );

    return Movie.create({
      actors: actorsDomain,
      id: movieModel.id,
      title: movieModel.title,
      year: movieModel.year,
      format: movieModel.format,
      updatedAt: movieModel.updatedAt,
      createdAt: movieModel.createdAt,
    });
  };
}
