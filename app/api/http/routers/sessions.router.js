import { Router } from "express";
import { asyncHandlerWrapperUtil } from "../utils";
import { bodyValidationMiddleware } from "../middlewares";
import { createSessionSchema } from "../validation";

export class SessionsRouter {
  constructor({ sessionsController }) {
    this.sessionsController = sessionsController;
  }

  init = () => {
    return new Router().post(
      "/sessions",
      bodyValidationMiddleware(createSessionSchema),
      asyncHandlerWrapperUtil(this.sessionsController.createSession),
    );
  };
}
