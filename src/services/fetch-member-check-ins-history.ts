import type { CheckIn } from '@prisma/client'
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js";

interface FetchMemberCheckInsHistoryServiceRequest {
    userId: string
    page : number
}

type FetchMemberCheckInsHistoryServiceResponse = {
    checkIns: CheckIn[]
}

export class FetchMemberCheckInsHistoryService {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({userId, page}: FetchMemberCheckInsHistoryServiceRequest): Promise<FetchMemberCheckInsHistoryServiceResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return {
            checkIns
        }
    }

}