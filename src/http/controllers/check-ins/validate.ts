import { MaxDistanceError } from "@/services/errors/max-distance-error.js"
import { MaxNumberOfCheckInsError } from "@/services/errors/max-number-of-check-ins-error.js"
import { makeValidateCheckInService } from "@/services/factories/make-validate-check-ins-service.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function validate(request: FastifyRequest, reply: FastifyReply) {

    const validateParamsSchema = z.object({
        checkInId: z.string()
    })


    const {checkInId} = validateParamsSchema.parse(request.params)
     

    try {
        const validateCheckInService = makeValidateCheckInService()

        await validateCheckInService.execute({
            checkInId : checkInId
           
        })
    } catch (err) {
        if (err instanceof MaxDistanceError || err instanceof MaxNumberOfCheckInsError) {
            return reply.status(400).send({ message: err.message })
        }

        return reply.status(500).send()

    }

    return reply.status(204).send()
}