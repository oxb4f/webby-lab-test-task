export class Actor {
  #_id;
  #_props;

  constructor({ id, name, createdAt, updatedAt }) {
    this.#_id = id;
    this.#_props = {
      name,
      createdAt,
      updatedAt,
    };
  }

  get id() {
    return this.#_id;
  }

  static create = ({ id, name, createdAt, updatedAt }) => {
    return new Actor({ id, name, createdAt, updatedAt });
  };

  unmarshall = () => {
    return {
      id: this.#_id,
      name: this.#_props.name,
      createdAt: this.#_props.createdAt,
      updatedAt: this.#_props.updatedAt,
    };
  };
}
