
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsService } from './search-gym.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository/in-memory-gyms-repository.js'
import { FetchNearbyGymsService } from './fetch-nearby-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch Nearby Gyms Service', () => {

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.6401091,
    })

    const { gyms } = await sut.execute({
      userLatitude : -27.2092052,
      userLongitude : -49.6401091
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })


})