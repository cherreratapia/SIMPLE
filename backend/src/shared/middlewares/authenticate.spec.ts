import authenticate from "./authenticate";

describe("Middlewares", () => {
  describe("Authenticate", () => {
    it("logged in", async () => {
      const req: any = {
        header: jest.fn().mockReturnValue("1")
      };
      const res: any = {};
      const next: any = jest.fn();
      const admin: any = {
        auth: jest.fn().mockReturnThis()
      };
      admin.auth().verifyIdToken = jest.fn().mockReturnValue({});

      await authenticate(admin)(req, res, next);
      expect(req.header.mock.calls).toEqual([["Authorization"]]);
      expect(next.mock.calls).toEqual([[]]);
    });

    it("Should be unauthorized", async () => {
      const req: any = {
        header: jest.fn().mockReturnValue("wrongUser")
      };
      const res: any = {
        sendStatus: jest.fn()
      };
      const next: any = jest.fn();
      const admin: any = {
        auth: jest.fn().mockReturnThis()
      };
      admin.auth().verifyIdToken = jest.fn().mockImplementation(() => {
        throw new Error("Error mock");
      });
      await authenticate(admin)(req, res, next);
      expect(req.header.mock.calls).toEqual([["Authorization"]]);
      expect(res.sendStatus.mock.calls).toEqual([[403]]);
      expect(next.mock.calls).toEqual([]);
    });
  });
});
