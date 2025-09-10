import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js"
import { SearchGymsService } from "../search-gym.js"

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new SearchGymsService(gymsRepository)
  return service
}