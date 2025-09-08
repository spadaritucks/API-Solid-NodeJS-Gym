import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { RegisterService } from "../register.js"

export function makeRegisterService() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsersRepository)
    return registerService;
}