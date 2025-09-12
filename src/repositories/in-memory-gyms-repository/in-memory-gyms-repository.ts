import { Prisma, type Gym } from "@prisma/client";
import type { GymsRepository } from "../gyms-repository.js";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordenates.js";

export class InMemoryGymsRepository implements GymsRepository {

    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find((item) => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }
    async searchMany(query: string, page: number) {
        return this.items
            .filter((item) => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }

    async findManyNearby(latitude: number, longitude: number): Promise<Gym[]> {
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: latitude, longitude: longitude },
                { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }
            )
            return distance < 10;
        })
    }
    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            checkIns: data.checkIns

        }

        this.items.push(gym)

        return gym;
    }


}