import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"
import { GetUserMetricsService } from "../get-user-metrics.js"
import { FetchMemberCheckInsHistoryService } from "../fetch-member-check-ins-history.js"

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new FetchMemberCheckInsHistoryService(checkInsRepository)
  return service
}