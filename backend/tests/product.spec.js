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

describe('Test /api/products/ post route', () => {
    it('should return the new product', async () => {
        const payload = {name: "test",
            price: "1",
            image: "url",}
        const res = await request(app).post('/api/products').send(payload);
        expect(res.status).to.equal(201)
        expect(res.body).to.have.property("success", true)
        expect(res.body).to.have.property("data").that.is.an("object")
    })
})