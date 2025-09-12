import { MaxDistanceError } from "@/services/errors/max-distance-error.js"
import { MaxNumberOfCheckInsError } from "@/services/errors/max-number-of-check-ins-error.js"
import { makeCheckInService } from "@/services/factories/make-check-in-service.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const createCheckInParamsSchema = z.object({
        gymId: z.string(),
    })

    const createCheckInBodySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const {latitude, longitude } = createCheckInBodySchema.parse(request.body)
       const {gymId} = createCheckInParamsSchema.parse(request.params)

    try {
        const checkInsService = makeCheckInService()

        await checkInsService.execute({
            userId : request.user.sub,
            gymId,
            userLatitude : latitude,
            userLongitude : longitude
        })
    } catch (err) {
        if (err instanceof MaxDistanceError || err instanceof MaxNumberOfCheckInsError) {
            return reply.status(400).send({ message: err.message })
        }

        return reply.status(500).send()

    }

    return reply.status(201).send()
}