import type { Gym, Prisma } from "generated/prisma/index.js";

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    findManyNearby (latitude : number, longitude : number) : Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    searchMany(query: string, page: number): Promise<Gym[]>
}