import type { GymsRepository } from "@/repositories/gyms-repository.js"
import type { Gym } from "generated/prisma/index.js"

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsService{
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return {
      gyms,
    }
  }
}