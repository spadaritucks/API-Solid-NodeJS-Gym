import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymService } from './create-gym.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository/in-memory-gyms-repository.js'
import { Decimal } from 'generated/prisma/runtime/library.js'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Service', () => {

    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository()
        sut = new CreateGymService(gymRepository)
    })

    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: -23.6928661,
            longitude: -46.5460151,
        })

        expect(gym.id).toEqual(expect.any(String))

    })



})

