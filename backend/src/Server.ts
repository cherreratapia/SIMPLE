import cookieParser from "cookie-parser";
import express from "express";
import { Request, Response } from "express";
import logger from "morgan";
import path from "path";
import BaseRouter from "./routes";
import redis, { RedisError } from "redis";
import fetch from "node-fetch";

// Init express
const app = express();

// Create client of redis
const client = redis.createClient(6379);

// Add middleware/settings/routes to express.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", BaseRouter);

client.on("error", (err: RedisError) => {
  console.log(`Error on redis client: ${err.message}`);
});

// Export express instance
export default app;
