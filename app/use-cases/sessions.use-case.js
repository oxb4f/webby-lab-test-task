import jwt from "jsonwebtoken";
import { UseCaseError } from "./errors/index.js";

export class SessionsUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  createSession = async ({ email, password }) => {
    const user = await this.userRepository.getUserByEmailAndPassword({
      email,
      password,
    });
    if (!user) {
      throw new UseCaseError("invalidCredentials");
    }

    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRATION_TIME}s`,
    });
  };
}
