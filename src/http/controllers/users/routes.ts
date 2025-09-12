import type { FastifyInstance } from "fastify";
import { register } from "./register.js";
import { authenticate } from "./authenticate.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { profile } from "./profile.js";



export async function userRoutes (app : FastifyInstance) {
    app.post("/users", register)
    app.post("/sessions", authenticate)

    app.get("/me",{onRequest : [verifyJWT]}, profile)
}