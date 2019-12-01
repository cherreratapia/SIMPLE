import { Request, Response, NextFunction } from "express";
import { logger } from "../../shared";
const randomizeFetch = async (req: any, res: any, next: NextFunction) => {
  try {
    const random = Math.random();
    const isError = random < 0.15;
    if (isError) {
      throw new Error("Error al consultar la API");
    } else {
      next();
    }
  } catch (error) {
    logger.error(`Error ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

export default randomizeFetch;
