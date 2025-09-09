import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-in-repository/in-memory-check-in-repository.js'
import { FetchMemberCheckInsHistoryService } from './fetch-member-check-ins-history.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchMemberCheckInsHistoryService

describe('Fetch User Check-in History Service', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchMemberCheckInsHistoryService(checkInsRepository)
    })

    it('should be able to fetch paginated check-in history', async () => {


        for (let i = 1; i <= 22; i++) {
            await checkInsRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01'
            })
        }


        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page : 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-22' })
        ])
    })

})

