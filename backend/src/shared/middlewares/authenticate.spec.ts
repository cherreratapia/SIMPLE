import authenticate from "./authenticate";

describe("Middlewares", () => {
  describe("Authenticate", () => {
    it("logged in", async () => {
      const req = {
        header: jest.fn().mockReturnValue("1")
      };
      const res = {};
      const next = jest.fn();
      const admin = {
        auth: jest.fn().mockReturnThis()
      };
      admin.auth().verifyIdToken = jest.fn().mockReturnValue({});

      await authenticate(admin)(req, res, next);
      expect(req.header.mock.calls).toEqual([["authToken"]]);
      expect(next.mock.calls).toEqual([[]]);
    });

    it("Should be unauthorized", async () => {
      const req = {
        header: jest.fn().mockReturnValue("wrongUser")
      };
      const res = {
        sendStatus: jest.fn()
      };
      const next = jest.fn();
      const admin = {
        auth: jest.fn().mockReturnThis()
      };
      admin.auth().verifyIdToken = jest.fn().mockImplementation(() => {
        throw new Error("Error mock");
      });
      await authenticate(admin)(req, res, next);
      expect(req.header.mock.calls).toEqual([["authToken"]]);
      expect(res.sendStatus.mock.calls).toEqual([[403]]);
      expect(next.mock.calls).toEqual([]);
    });
  });
});
