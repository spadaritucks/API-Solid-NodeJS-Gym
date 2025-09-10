import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js"
import { CheckInService } from "../check-in.js"
import { FetchNearbyGymsService } from "../fetch-nearby-gyms.js"

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new FetchNearbyGymsService(gymsRepository)
  return service
}