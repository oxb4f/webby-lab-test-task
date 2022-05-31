import { DataTypes } from "sequelize";
import { MovieFormat } from "../../../../domain";

export const movieSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    unique: true,
  },
  year: {
    type: DataTypes.INTEGER,
  },
  format: {
    type: DataTypes.ENUM(MovieFormat.DVD, MovieFormat.VHS, MovieFormat.BLURAY),
  },
};
