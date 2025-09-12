import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service.js"

import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function search(request: FastifyRequest, reply: FastifyReply) {

    const searchGymBodySchema = z.object({
        q : z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { page, q } = searchGymBodySchema.parse(request.query)

    const searchService = makeSearchGymsService()

       const {gyms} = await searchService.execute({
           query: q, page
        })

    return reply.status(200).send({
        gyms
    })
}