import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInService } from './check-in.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-in-repository/in-memory-check-in-repository.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository/in-memory-gyms-repository.js'
import { Decimal } from 'generated/prisma/runtime/library.js'




let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('CheckIn Service', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInService(checkInsRepository, gymsRepository)

        vi.useFakeTimers()

        gymsRepository.items.push({
            id: 'gym-01',
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })

    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to CheckIn', async () => {
        vi.setSystemTime(new Date(2022, 0, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -23.6928661,
            userLongitude: -46.5460151
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    it('should not be able to check in twice in the same day', async () => {


        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -23.6928661,
            userLongitude: -46.5460151
        })

        await expect(sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -23.6928661,
            userLongitude: -46.5460151
        })).rejects.toBeInstanceOf(Error)

    })

    it('should not be able to check in twice but in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -23.6928661,
            userLongitude: -46.5460151
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -23.6928661,
            userLongitude: -46.5460151
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })




})

