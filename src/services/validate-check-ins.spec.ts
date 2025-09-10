
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-in-repository/in-memory-check-in-repository.js'
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { ValidateCheckInService } from './validate-check-ins.js'
import { ResourceNotFoundError } from './errors/resource-not-exists.js'



let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService


describe('Validate Check-in Service', () => {

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })


  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })


  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation ', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    })

    vi.advanceTimersByTime(1000 * 60 * 21)

    expect(() => sut.execute({
      checkInId : createdCheckIn.id
    })).rejects.toBeInstanceOf(Error)

  })

})