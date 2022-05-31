import { Op, Sequelize, UniqueConstraintError, where } from "sequelize";
import { ActorModel, MovieModel, sequelize } from "../index.js";
import { Actor, Movie } from "../../../../domain/index.js";

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
    try {
      const movie = await sequelize.transaction(async (t) => {
        const movie = await MovieModel.create(
          { title, year, format },
          { transaction: t },
        );

        if (Array.isArray(actors)) {
          await ActorModel.bulkCreate(
            actors.map((actor) => {
              return { name: actor, MovieId: movie.id };
            }),
            { transaction: t },
          );
        }

        return movie;
      });

      return await MoviesRepository.toDomain(movie);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return null;
      }

      throw error;
    }
  };

  createMovies = async (movies) => {
    try {
      const _movies = await sequelize.transaction(async (t) => {
        const _movies = [];

        for (const { title, year, format, actors } of movies) {
          const movie = await MovieModel.create(
            { title, year, format },
            { transaction: t },
          );

          if (Array.isArray(actors)) {
            await ActorModel.bulkCreate(
              actors.map((actor) => {
                return { name: actor, MovieId: movie.id };
              }),
              { transaction: t },
            );
          }

          _movies.push(movie);
        }

        return _movies;
      });

      return await Promise.all(
        _movies.map((_movie) => MoviesRepository.toDomain(_movie)),
      );
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return null;
      }

      throw error;
    }
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
    try {
      const movie = await sequelize.transaction(async (t) => {
        const toUpdate = {};
        if (title) {
          toUpdate.title = title;
        }
        if (year) {
          toUpdate.year = year;
        }
        if (format) {
          toUpdate.format = format;
        }

        await MovieModel.update(toUpdate, {
          where: { id: movieId },
          transaction: t,
          returning: true,
        });

        const movie = await MovieModel.findByPk(movieId, { transaction: t });

        if (Array.isArray(actors)) {
          await ActorModel.destroy({
            where: { MovieId: movieId },
            transaction: t,
          });

          await ActorModel.bulkCreate(
            actors.map((actor) => {
              return { name: actor, MovieId: movie.id };
            }),
            { transaction: t },
          );
        }

        return movie;
      });

      return await MoviesRepository.toDomain(movie);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return null;
      }

      throw error;
    }
  };

  getMovies = async ({ actor, title, search, sort, order, limit, offset }) => {
    const query = {
      where: {},
      group: ["title"],
      order: [[Sequelize.fn("lower", Sequelize.col(sort)), order]],
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
    const actors = await ActorModel.findAll({
      where: { MovieId: movieModel.id },
    });

    const actorsDomain = actors.map((actor) => Actor.create(actor));

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
