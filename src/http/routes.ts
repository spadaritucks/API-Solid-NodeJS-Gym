import type { FastifyInstance } from "fastify";
import { register } from "./controllers/register.js";
import { authenticate } from "./controllers/authenticate.js";

export async function appRoutes (app : FastifyInstance) {
    app.post("/users", register)
    app.post("/sessions", authenticate)
}