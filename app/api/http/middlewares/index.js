import { authMiddlewareFactory } from "./auth.middleware.js";
import { usersUseCase } from "../../../use-cases/index.js";

export const authMiddleware = authMiddlewareFactory({ usersUseCase });

export * from "./validation.middleware.js";
export * from "./error.middleware.js";
