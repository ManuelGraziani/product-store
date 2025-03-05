import { expect } from "chai"
import request from "supertest"
import app from "../server.js"

describe('Test /api/products/ route', () => {
    it('should return all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property("success", true)
        expect(res.body).to.have.property("data").that.is.an("array")
    })
})