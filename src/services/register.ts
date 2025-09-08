import { prisma } from "@/lib/prisma.js"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js"
import { hash } from "bcryptjs"

interface RegisterServiceProps {
    name : string
    email : string
    password : string
}

export async function registerService({name, email, password} : RegisterServiceProps) {

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        throw new Error("User already exists")
    }

    const prismaUsersRepository = new PrismaUsersRepository()
    prismaUsersRepository.create({
        name,
        email,
        password_hash
    })

    
}