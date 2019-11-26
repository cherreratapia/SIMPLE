import { Request, Response, NextFunction } from "express";
const authenticate = (admin: any) => {
  return async (req: any, res: any, next: NextFunction) => {
    try {
      const token: any = req.header("authToken");
      const result = await admin
        .auth()
        .verifyIdToken(
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU3NDczOTU1NCwiZXhwIjoxNTc0NzQzMTU0LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1hcXA1aUBzaW1wbGUtcmlwbGV5LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstYXFwNWlAc2ltcGxlLXJpcGxleS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6InRHbXVRalFJcGtlNlo5eTljWHVXMmZBMjRuSTIifQ.q2DKNrRqPIJ_LxNLydTXXvERoGUc6BAujVANZ6setDbz5wnzxKlJa1INcpAa0NH0cIAWTJHMJD_z9_Wc7T5HgllGoNhxzmL4u_ZgakvLcgHltgGdOD4w7vlrtfY8h-hM_Bet9xVMicFmrpVDuHN4C0QZkN8NQ4bxGAchCLJu3UesgklZ-jKYQvaxG4mwPX8kEEFLADhNB1YmzMArw8dUBhmFTWWlMU5DVac-ILiLwxmdR_yJ8OmL3xILC1vhpcnDKsJtREcmyqCFEpvs4L5ymcgy6DXwHaybARAqx207e-zKsfbAmEBzsL1AQzAzNMdE7SAYShTpJvknFB8A3Fvsxg"
        );
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
