import { prisma } from "@/lib/prisma.js";
import type { Prisma } from "generated/prisma/index.js";
import type { UsersRepository } from "../users-repository.js";


export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({ data })
        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user;
    }
}