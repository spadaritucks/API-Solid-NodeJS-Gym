import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInService } from './check-in.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-in-repository/in-memory-check-in-repository.js'




let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('CheckIn Service', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInService(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to CheckIn', async () => {
        vi.setSystemTime(new Date(2022, 0, 8, 0, 0))
        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01"
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    it('should not be able to check in twice in the same day', async () => {
        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01"
        })

        await expect(sut.execute({
            userId: "user-01",
            gymId: "gym-01"
        })).rejects.toBeInstanceOf(Error)

    })

    it('should not be able to check in twice but in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: "user-01",
            gymId: "gym-01"
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01"
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })




})

