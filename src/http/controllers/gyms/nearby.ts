import { makeFetchNearbyGymsService } from "@/services/factories/make-fetch-nearby-gyms-service.js"
import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service.js"

import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function nearby(request: FastifyRequest, reply: FastifyReply) {

    const nearbyeGymBodySchema = z.object({
        userLatitude : z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { userLatitude, userLongitude } = nearbyeGymBodySchema.parse(request.query)

    const nearbyGymService = makeFetchNearbyGymsService()

       const {gyms} = await nearbyGymService.execute({
           userLatitude, userLongitude
        })

    return reply.status(200).send({
        gyms
    })
}