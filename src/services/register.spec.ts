import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository/in-memory-users-repository.js'
import { UserAlreadyExists } from './errors/user-already-exists.js'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterService(usersRepository)
    })

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'Jonh Doe',
            email: 'jonhdoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'Jonh Doe',
            email: 'jonhdoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)


    })

    it('should not be able to register with same email twice', async () => {
        const email = "jonhdoe@example.com"

        await sut.execute({
            name: 'Jonh Doe',
            email,
            password: '123456'
        })

        await expect(() =>
            sut.execute({
                name: 'Jonh Doe',
                email: 'jonhdoe@example.com',
                password: '123456'
            })).rejects.toBeInstanceOf(UserAlreadyExists)


    })
})

