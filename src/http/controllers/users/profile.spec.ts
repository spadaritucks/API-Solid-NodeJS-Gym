import request from 'supertest'
import { app } from "@/app.js"
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-user-and-authenticate.js'


describe("Get User Profile (e2e)", () => {


    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to return user profile", async () => {
         const { token } = await createAndAuthenticateUser(app)

        const response =
            await request(app.server)
                .get("/me")
                .set("Authorization", `bearer ${token}`)

        expect(response.statusCode).toEqual(200)
        expect(response.body.user).toEqual(expect.objectContaining({
            email: "johndoe@example.com"
        }))


    })
})