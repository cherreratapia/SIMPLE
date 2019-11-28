import { productsHandlers } from "./index";

describe("Product Router", () => {
  describe("Get by Part Number", () => {
    it("Should return the products details", async () => {
      const req: any = {
        params: {
          id: "1234"
        }
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const axios = {
        get: jest.fn().mockResolvedValue({
          data: { name: "Object 1", price: 1000 }
        })
      };
      const client = {
        get: jest.fn().mockImplementation((err, callback) => callback("test")),
        setex: jest.fn()
      };
      await productsHandlers({ axios, client }).getByParamNumber(req, res);
      expect(res.status.mock.calls).toEqual([[200]]);
      expect(res.json.mock.calls).toEqual([
        [{ data: { name: "Object 1", price: 1000 } }]
      ]);
    });
  });
  describe("Get all products", () => {
    it("Should return all products", async () => {
      const req: any = jest.fn();
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const axios = {
        get: jest.fn().mockResolvedValue({
          data: { name: "Object 1", price: 1000 }
        })
      };
      const client = {
        get: jest.fn().mockImplementation((err, callback) => callback("test")),
        setex: jest.fn()
      };
      await productsHandlers({ axios, client }).get(req, res);
      expect(res.status.mock.calls).toEqual([[200]]);
      expect(res.json.mock.calls).toEqual([
        [
          {
            data: [
              { name: "Object 1", price: 1000 },
              { name: "Object 1", price: 1000 },
              { name: "Object 1", price: 1000 }
            ]
          }
        ]
      ]);
    });
  });
});
