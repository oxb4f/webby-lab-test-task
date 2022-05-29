import express from "express";
import bodyParser from "body-parser";
import compression from "compression";

import { errorMiddleware } from "./middlewares";

export class Server {
  _commonPrefix = "/api";
  _defaultPort = 8050;

  constructor({ moviesRouter, sessionsRouter, usersRouter }) {
    this.moviesRouter = moviesRouter;
    this.sessionsRouter = sessionsRouter;
    this.usersRouter = usersRouter;
  }

  start = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(compression());

    app.use(`${this._commonPrefix}/v1`, this.moviesRouter.init());
    app.use(`${this._commonPrefix}/v1`, this.sessionsRouter.init());
    app.use(`${this._commonPrefix}/v1`, this.usersRouter.init());

    app.use(errorMiddleware);

    if (!process.env.APP_PORT) {
      console.log(
        `App port is not specified. Default port ${this._defaultPort} is used`,
      );
    }

    app.listen(process.env.APP_PORT ?? this._defaultPort);
  };
}
