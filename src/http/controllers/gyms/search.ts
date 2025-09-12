import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service.js"

import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function search(request: FastifyRequest, reply: FastifyReply) {

    const searchGymBodySchema = z.object({
        query : z.string(),
        page: z.coerce.number()
    })

    const { page,query } = searchGymBodySchema.parse(request.query)

    const searchService = makeSearchGymsService()

       const {gyms} = await searchService.execute({
           query, page
        })

    return reply.status(200).send({
        gyms
    })
}