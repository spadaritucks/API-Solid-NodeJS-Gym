import type { CheckIn, Prisma, User } from "generated/prisma/index.js";

export interface CheckInsRepository {
    create(data : Prisma.CheckInUncheckedCreateInput ) : Promise<CheckIn>
}