import { expect, describe, it } from 'vitest'
import { RegisterService } from './register.js'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository/in-memory-users-repository.js'
import { UserAlreadyExists } from './errors/user-already-exists.js'
import { AuthenticateService } from './authenticate.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

describe('Authenticate Service', () => {


    it('should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(usersRepository)

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
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(usersRepository)

        expect(() => sut.execute({
            email: 'jonhdoe@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(usersRepository)

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

