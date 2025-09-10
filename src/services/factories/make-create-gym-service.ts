import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js"
import { CreateGymService } from "../create-gym.js"

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new CreateGymService(gymsRepository)
  return service
}