import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { RegisterService } from "../register.js"
import { AuthenticateService } from "../authenticate.js";

export function makeAuthenticateService() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(prismaUsersRepository)
    return authenticateService;
}