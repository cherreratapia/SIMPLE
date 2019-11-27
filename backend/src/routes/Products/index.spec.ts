import { productsHandlers } from "./index";
import { PRODUCTS_SKU } from "../../util";

describe("Product Router", () => {
  describe("Get by Part Number", () => {
    it("Should return the products details", async () => {
      const req = {
        params: {
          id: "1234"
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
      };
      const axios = {
        get: jest.fn().mockResolvedValue({
          data: {
            name: "test",
            price: 1000
          }
        })
      };
      const productCached = "product:detail";
      const client = {
        get: jest
          .fn()
          .mockImplementation((productCached, callback) => callback("test")),
        setex: jest.fn()
      };
      await productsHandlers({ axios, client }).getByParamNumber(req, res);
      expect(res.status.mock.calls).toEqual([[201]]);
      expect(res.send.mock.calls).toEqual([[{ name: "test", price: 1000 }]]);
      expect(axios.get.mock.calls).toEqual([
        [`https://simple.ripley.cl/api/v2/products/${req.params.id}`]
      ]);
    });
  });
  describe("Get all products", () => {
    it("Should return all products", async () => {
      const req = jest.fn();
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      const axios = {
        get: jest.fn().mockResolvedValue({
          data: { name: "Object 1", price: 1000 }
        })
      };
      const productCached = "product:list";
      const client = {
        get: jest
          .fn()
          .mockImplementation((productCached, callback) =>
            callback("Prueba de redis")
          ),
        setex: jest.fn()
      };
      await productsHandlers({ axios, client }).get(req, res);
      expect(res.status.mock.calls).toEqual([[201]]);
      expect(res.send.mock.calls).toEqual([
        [
          [
            { name: "Object 1", price: 1000 },
            { name: "Object 1", price: 1000 },
            { name: "Object 1", price: 1000 }
          ]
        ]
      ]);
    });
  });
});
