import type { Gym, Prisma } from "generated/prisma/index.js";
import type { GymsRepository } from "../gyms-repository.js";
import { prisma } from "@/lib/prisma.js";

export class PrismaGymsRepository implements GymsRepository {

    async findById(id: string): Promise<Gym | null> {
        const gym = await prisma.gym.findUnique({
            where: {
                id
            }
        })

        if (!gym) {
            return null

        }

        return gym;
    }

    async findManyNearby(latitude: number, longitude: number): Promise<Gym[]> {
        const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) 
        * cos( radians( latitude ) ) 
        * cos( radians( longitude ) - radians(${longitude}) ) + 
        sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms;
    }

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = await prisma.gym.create({
            data
        })

        return gym
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gyms;
    }

}