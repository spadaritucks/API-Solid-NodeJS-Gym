import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env/index.js";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./http/controllers/users/routes.js";
import { gymsRoutes } from "./http/controllers/gyms/routes.js";
import { checkInsRoutes } from "./http/controllers/check-ins/routes.js";
import fastifyCookie from "@fastify/cookie";
export const app = fastify()

app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.register(fastifyCookie)

app.register(fastifyJwt, {
    secret : env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn  : '10m',
    }
})

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError) {
        return reply
        .status(400)
        .send({message : 'Validation error.', issues: error.format() })
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    }
    return reply.status(500).send({message : "Internal server error"})
})





