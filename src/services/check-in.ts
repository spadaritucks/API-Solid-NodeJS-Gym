import type { UsersRepository } from "@/repositories/users-repository.js";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";
import { compare } from "bcryptjs";
import type { CheckIn, User } from "generated/prisma/index.js";
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js";

interface CheckInServiceRequest {
    userId: string
    gymId: string
}

type CheckInServiceResponse = {
    checkIn: CheckIn
}

export class CheckInService {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ userId,gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if(checkInOnSameDay){
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({user_id : userId, gym_id : gymId})

      

        return {
            checkIn
        }
    }

}