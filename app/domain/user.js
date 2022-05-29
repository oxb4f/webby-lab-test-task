export class User {
  #_id;
  #_props;

  constructor({ id, email, name, password }) {
    this.#_id = id;
    this.#_props = {
      email,
      name,
      password,
    };
  }

  get id() {
    return this.#_id;
  }

  static create = ({ id, email, name, password }) => {
    return new User({ id, email, name, password });
  };

  unmarshal = () => {
    return {
      id: this.#_id,
      email: this.#_props.email,
      name: this.#_props.name,
    };
  };
}
