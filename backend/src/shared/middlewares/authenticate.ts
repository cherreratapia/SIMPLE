import { Request, Response, NextFunction } from "express";
import admin = require("firebase-admin");

const authenticate = (admin: admin.app.App) => {
  return async (req: Request, res: any, next: NextFunction) => {
    try {
      const token: any = req.header("authToken");
      const result = await admin.auth().verifyIdToken(token);
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
