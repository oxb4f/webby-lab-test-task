import { UseCaseError } from "./errors/index.js";
import jwt from "jsonwebtoken";

export class UsersUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  createUser = async ({ email, name, password }) => {
    const user = await this.userRepository.createUser({
      email,
      name,
      password,
    });
    if (!user) {
      throw new UseCaseError("userAlreadyExist");
    }

    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRATION_TIME}s`,
    });
  };

  getUserById = async ({ userId }) => {
    const user = await this.userRepository.getUserById({ userId });
    if (!user) {
      throw new UseCaseError("userDoesNotExist");
    }

    return user;
  };
}
