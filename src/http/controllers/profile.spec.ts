import request from 'supertest'
import { app } from "@/app.js"
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe("Get User Profile (e2e)", () => {


    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to return user profile", async () => {
        await request(app.server)
            .post("/users")
            .send({
                name: "Jonh Doe",
                email: "jonhdoe@example.com",
                password: "123456",
            })

        const { body: { token } } = await request(app.server)
            .post("/sessions")
            .send({
                email: "jonhdoe@example.com",
                password: "123456",
            })

        const response =
            await request(app.server)
                .get("/me")
                .set("Authorization", `bearer ${token}`)

        expect(response.statusCode).toEqual(200)
        expect(response.body.user).toEqual(expect.objectContaining({
            email: "jonhdoe@example.com"
        }))


    })
})