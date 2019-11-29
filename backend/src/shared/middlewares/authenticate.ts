import { Request, Response, NextFunction } from "express";
import admin = require("firebase-admin");

const authenticate = (admin: admin.app.App) => {
  return async (req: Request, res: any, next: NextFunction) => {
    try {
      const token: any = req.header("Authorization");
      const responseFireAuth = await admin.auth().verifyIdToken(token);
      if (responseFireAuth) {
        next();
      } else {
        return res.sendStatus(403);
      }
    } catch (error) {
      console.log(`Error al verificar token ${error.message}`);
      return res.sendStatus(403);
    }
  };
};

export default authenticate;
