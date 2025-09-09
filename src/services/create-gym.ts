import type { UsersRepository } from "@/repositories/users-repository.js"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user-already-exists.js"
import type { Gym, User } from "generated/prisma/index.js"
import type { GymsRepository } from "@/repositories/gyms-repository.js"

interface CreateGymServiceProps {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number

}

interface CreateGymServiceResponse {
    gym: Gym
}

export class CreateGymService {
    constructor(private gymRepository: GymsRepository) { }

    async execute({ title, description, phone, latitude, longitude }: CreateGymServiceProps): Promise<CreateGymServiceResponse> {

        const gym = await this.gymRepository.create({ title, description, phone, latitude, longitude })

        return {
            gym
        }

    }
}

