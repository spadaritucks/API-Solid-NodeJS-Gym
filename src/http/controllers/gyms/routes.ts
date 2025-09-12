import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import type { FastifyInstance } from "fastify";
import { search } from "./search.js";
import { nearby } from "./nearby.js";
import { createGym } from "./create.js";


export async function gymsRoutes (app : FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('gyms/search', search)
    app.get('gyms/nearby', nearby)
    app.post('gyms', createGym)
}