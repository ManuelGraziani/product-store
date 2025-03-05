import { expect } from "chai"
import { getProduct } from "../controllers/product.controller"

describe('Test / route', () => {
    it('should return all products', async () => {
        const products = await getProduct()
        expect(products).to.equal({success: true})
    })
})