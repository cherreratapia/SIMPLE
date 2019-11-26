import { Request, Response, NextFunction } from "express";
const authenticate = (admin: any) => {
  return async (req: any, res: any, next: NextFunction) => {
    try {
      const token: any = req.header("authToken");
      const result = await admin.auth().verifyIdToken(token);
      console.log("result", result);
      if (result) {
        next();
      }
    } catch (error) {
      console.log(`Error al verificar token ${error}`);
      return res.sendStatus(403);
    }
  };
};

export default authenticate;
