import { UniqueConstraintError } from "sequelize";
import { UserModel } from "../index.js";
import { User } from "../../../../domain";

export class UserRepository {
  createUser = async ({ email, name, password }) => {
    try {
      const user = await UserModel.create({ email, name, password });

      return await UserRepository.toDomain(user);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return null;
      }

      throw error;
    }
  };

  getUserById = async ({ userId }) => {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return null;
    }

    return await UserRepository.toDomain(user);
  };

  getUserByEmailAndPassword = async ({ email, password }) => {
    const user = await UserModel.findOne({ where: { email, password } });
    if (!user) {
      return null;
    }

    return await UserRepository.toDomain(user);
  };

  static toDomain = async (userModel) => {
    return User.create({
      id: userModel.id,
      password: userModel.password,
      name: userModel.name,
      email: userModel.email,
    });
  };
}
