import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository/in-memory-users-repository.js'
import { GetUserProfileService } from './get-user-profile.js'
import { ResourceNotFoundError } from './errors/resource-not-exists.js'


let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileService(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'Jonh Doe',
            email: 'jonhdoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const {user} = await sut.execute({userId : createdUser.id})

     

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual("Jonh Doe")

    })

    it('should not be able to get user profile with wrong id', async () => {
        expect(() => sut.execute({
           userId : "not-existing-id"
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

  



})

