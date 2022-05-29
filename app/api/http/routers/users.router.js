import { Router } from "express";
import { asyncHandlerWrapperUtil } from "../utils";
import { bodyValidationMiddleware } from "../middlewares";
import { createUserSchema } from "../validation";

export class UsersRouter {
  constructor({ usersController }) {
    this.usersController = usersController;
  }

  init = () => {
    return new Router().post(
      "/users",
      bodyValidationMiddleware(createUserSchema),
      asyncHandlerWrapperUtil(this.usersController.createUser),
    );
  };
}
