import { prisma } from "@/lib/prisma.js";
import { randomUUID } from "crypto";
import type { CheckIn, Prisma, User } from "generated/prisma/index.js";
import type { CheckInsRepository } from "../check-ins-repository.js";

export class InMemoryCheckInsRepository implements CheckInsRepository {

    public items: CheckIn[] = []

   async create(data: Prisma.CheckInUncheckedCreateInput)  {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: new Date(),
            created_at: new Date()


        }
        this.items.push(checkIn)
        return checkIn

    }
}