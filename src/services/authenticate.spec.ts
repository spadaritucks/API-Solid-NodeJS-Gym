import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository/in-memory-users-repository.js'
import { AuthenticateService } from './authenticate.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'


let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateService(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'Jonh Doe',
            email: 'jonhdoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'jonhdoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it('should not be able to authenticate with wrong email', async () => {
        expect(() => sut.execute({
            email: 'jonhdoe@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'Jonh Doe',
            email: 'jonhdoe@example.com',
            password_hash: await hash('123456', 6)
        })

        expect(() => sut.execute({
            email: 'jonhdoe@example.com',
            password: '12345666'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })



})

