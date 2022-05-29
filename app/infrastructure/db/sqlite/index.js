import { Sequelize } from "sequelize";
import path from "path";

import { movieSchema, userSchema, actorSchema } from "./schemas";

if (!process.env.DB_FILE_NAME) {
  console.error("Filename of sqlite database is not specified");

  process.exit(1);
}

export const DB_FILE_NAME = process.env.DB_FILE_NAME;

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(process.cwd(), `db/${DB_FILE_NAME}`),
});

try {
  await sequelize.authenticate();
} catch (error) {
  console.error("Unable to connect to the database:", error);

  process.exit(1);
}

export const UserModel = sequelize.define("User", userSchema, {
  tableName: "users",
  timestamps: true,
});
export const MovieModel = sequelize.define("Movie", movieSchema, {
  tableName: "movies",
  timestamps: true,
  indexes: [{ fields: ["format"], unique: false }],
});
export const ActorModel = sequelize.define("Actor", actorSchema, {
  tableName: "actors",
  timestamps: true,
});

MovieModel.hasMany(ActorModel);
ActorModel.belongsTo(MovieModel);

await sequelize.sync();
