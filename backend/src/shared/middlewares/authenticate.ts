import { Request, Response, NextFunction } from "express";
import admin = require("firebase-admin");
import { logger } from "../Logger";

const authenticate = (admin: admin.app.App) => {
  return async (req: Request, res: any, next: NextFunction) => {
    try {
      const token: any = req.header("Authorization");
      const responseFireAuth = await admin.auth().verifyIdToken(token);
      if (responseFireAuth) {
        console.log("if de auth");
        next();
      } else {
        console.log("else en auth");
        return res.sendStatus(403);
      }
    } catch (error) {
      console.log("error en auth", error);
      logger.error(`Error al verificar token ${error.message}`);
      return res.sendStatus(403);
    }
  };
};

export default authenticate;
