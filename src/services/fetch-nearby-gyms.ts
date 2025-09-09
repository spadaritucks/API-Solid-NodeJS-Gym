import type { GymsRepository } from "@/repositories/gyms-repository.js"
import type { Gym } from "generated/prisma/index.js"

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsService{
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    userLatitude, userLongitude
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby(userLatitude, userLongitude)
    return {
      gyms
    }
  }
}