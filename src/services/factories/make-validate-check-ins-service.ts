import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"
import { GetUserMetricsService } from "../get-user-metrics.js"
import { ValidateCheckInService } from "../validate-check-ins.js"

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new ValidateCheckInService(checkInsRepository)
  return service
}