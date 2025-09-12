import { makeFetchNearbyGymsService } from "@/services/factories/make-fetch-nearby-gyms-service.js"
import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service.js"

import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function nearby(request: FastifyRequest, reply: FastifyReply) {

    const nearbyeGymBodySchema = z.object({
        latitude : z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = nearbyeGymBodySchema.parse(request.query)

    const nearbyGymService = makeFetchNearbyGymsService()

       const {gyms} = await nearbyGymService.execute({
           userLatitude: latitude, 
           userLongitude: longitude
        })

    return reply.status(200).send({
        gyms
    })
}