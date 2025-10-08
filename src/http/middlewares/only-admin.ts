import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error.js";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export function verifyUserRole(roleToVerify : 'ADMIN' | 'MEMBER') {

    return (request: FastifyRequest, reply: FastifyReply) => {
        const { role } = request.user

        if (roleToVerify !== role) {
            return reply.status(401).send({ message: 'Unauthorized' })
        } 
    }


}