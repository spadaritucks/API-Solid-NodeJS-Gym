import { prisma } from "@/lib/prisma.js";
import type { Prisma, User } from "generated/prisma/index.js";
import type { UsersRepository } from "../users-repository.js";


export class PrismaUsersRepository implements UsersRepository {

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        })

        if (!user) {
            return null
        }

        return user;
    }

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

        if (!user) {
            return null
        }

        return user;
    }
}