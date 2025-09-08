import { prisma } from "@/lib/prisma.js"
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

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password_hash
        }
    })

    
}