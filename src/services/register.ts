import { prisma } from "@/lib/prisma.js"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user-already-exists.js"
import type { User } from "generated/prisma/index.js"

interface RegisterServiceProps {
    name: string
    email: string
    password: string
}

interface RegisterServiceResponse {
    user : User
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterServiceProps) : Promise<RegisterServiceResponse> {

        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExists()
        }


       const user =  await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return {user};

    }
}

