import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInService } from './check-in.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-in-repository/in-memory-check-in-repository.js'



let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('CheckIn Service', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInService(checkInsRepository)
    })

    it('should be able to CheckIn', async () => {
        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01"
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

   


})

