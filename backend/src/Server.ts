import cookieParser from "cookie-parser";
import express from "express";
import { Request, Response } from "express";
import logger from "morgan";
import path from "path";
import BaseRouter from "./routes";
import redis, { RedisError, RedisClient } from "redis";

import admin from "firebase-admin";
import axios from "axios";
import cors from "cors";
const serviceAccount = require("../config/simple-ripley-9c988-firebase-adminsdk-mcxxq-a309bc538f.json");
// Init express
const app = express();

const auth = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://simple-ripley-9c988.firebaseio.com"
});

//token
/* 
  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU3NDczOTU1NCwiZXhwIjoxNTc0NzQzMTU0LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1hcXA1aUBzaW1wbGUtcmlwbGV5LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstYXFwNWlAc2ltcGxlLXJpcGxleS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6InRHbXVRalFJcGtlNlo5eTljWHVXMmZBMjRuSTIifQ.q2DKNrRqPIJ_LxNLydTXXvERoGUc6BAujVANZ6setDbz5wnzxKlJa1INcpAa0NH0cIAWTJHMJD_z9_Wc7T5HgllGoNhxzmL4u_ZgakvLcgHltgGdOD4w7vlrtfY8h-hM_Bet9xVMicFmrpVDuHN4C0QZkN8NQ4bxGAchCLJu3UesgklZ-jKYQvaxG4mwPX8kEEFLADhNB1YmzMArw8dUBhmFTWWlMU5DVac-ILiLwxmdR_yJ8OmL3xILC1vhpcnDKsJtREcmyqCFEpvs4L5ymcgy6DXwHaybARAqx207e-zKsfbAmEBzsL1AQzAzNMdE7SAYShTpJvknFB8A3Fvsxg
*/

// Create client of redis
const client: RedisClient = redis.createClient(6379);

// Add middleware/settings/routes to express.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1", BaseRouter({ auth, axios, client }));

client.on("error", (err: RedisError) => {
  console.log(`Error on redis client: ${err.message}`);
});

// Export express instance
export default app;
