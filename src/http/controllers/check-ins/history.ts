import { makeFetchUserCheckInsHistoryService } from "@/services/factories/make-fetch-member-check-ins-history-service.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function history(request: FastifyRequest, reply: FastifyReply) {

    const checkInHistoryBodySchema = z.object({
        page: z.coerce.number()
    })

    const { page } = checkInHistoryBodySchema.parse(request.query)

    const userCheckinsHistoryService = makeFetchUserCheckInsHistoryService()

    const { checkIns } = await userCheckinsHistoryService.execute({
        userId: request.user.sub,
        page
    })

    return reply.status(200).send({
        checkIns
    })
}