import type { CheckIn } from "generated/prisma/index.js";
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-exists.js";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error.js";


interface ValidateCheckInServiceRequest {
    checkInId: string
}

type ValidateCheckInServiceResponse = {
    checkIn: CheckIn
}

export class ValidateCheckInService {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) { }

    async execute({ checkInId }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {

        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }
        checkIn.validated_at = new Date()
        await this.checkInsRepository.save(checkIn)

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes',
        )

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidationError()
        }


        return {
            checkIn
        }
    }

}