import { Prisma, type User } from "generated/prisma/index.js"

export interface UsersRepository {
    findByEmail(email : string) : Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
}

