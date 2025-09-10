import { GetUserProfileService } from "../get-user-profile.js"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js"

export function makeGetUserProfileService() {
  const userRepository = new PrismaUsersRepository()
  const service = new GetUserProfileService(userRepository)
  return service
}