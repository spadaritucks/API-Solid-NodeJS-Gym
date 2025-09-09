import type { UsersRepository } from "@/repositories/users-repository.js";
import type { User } from "generated/prisma/index.js";
import { ResourceNotFoundError } from "./errors/resource-not-exists.js";

interface GetUserProfileServiceRequest {
    userId: string
}

type GetUserProfileServiceResponse = {
    user: User
}

export class GetUserProfileService {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({ userId }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError()
        }


        return {
            user
        }
    }

}