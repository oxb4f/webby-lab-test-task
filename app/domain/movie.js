export const MovieFormat = Object.freeze({
  VHS: "VHS",
  DVD: "DVD",
  BLURAY: "Blu-Ray",
});

export class Movie {
  #_id;
  #_props;

  constructor({ id, title, year, format, actors, createdAt, updatedAt }) {
    this.#_id = id;
    this.#_props = {
      title,
      year,
      format,
      actors,
      createdAt,
      updatedAt,
    };
  }

  get id() {
    return this.#_id;
  }

  static create = ({
    id,
    title,
    year,
    format,
    actors,
    createdAt,
    updatedAt,
  }) => {
    return new Movie({ id, title, year, format, actors, createdAt, updatedAt });
  };

  unmarshall = () => {
    return {
      id: this.#_id,
      title: this.#_props.title,
      year: this.#_props.year,
      format: this.#_props.format,
      actors: this.#_props.actors.map((actor) => actor.unmarshall()),
      createdAt: this.#_props.createdAt,
      updatedAt: this.#_props.updatedAt,
    };
  };
}
