import { moviesRouter, sessionsRouter, usersRouter } from "./routers";
import { Server } from "./server.js";

export const server = new Server({ moviesRouter, sessionsRouter, usersRouter });
