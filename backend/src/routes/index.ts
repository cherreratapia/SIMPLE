import { Router } from "express";
import { productsHandlers } from "./Products";
import { AxiosStatic } from "axios";
import { RedisClient } from "redis";
import authenticate from "../shared/middlewares/authenticate";
import randomizeFetch from "../shared/middlewares/randomizeFetch";
import admin from "firebase-admin";

const baseRouterHandler = ({
  auth,
  axios,
  client
}: {
  auth: admin.app.App;
  axios: AxiosStatic;
  client: RedisClient;
}) => {
  // Init router and path
  const router = Router();

  // Product Router
  const ProductRouter = Router();
  ProductRouter.get(
    "/",
    [authenticate(auth), randomizeFetch],
    productsHandlers({ axios, client }).get
  );
  ProductRouter.get(
    "/:id",
    [authenticate(auth), randomizeFetch],
    productsHandlers({ axios, client }).getByParamNumber
  );

  // Add sub-routes
  router.use("/product", ProductRouter);

  // Export the base-router
  return router;
};
export default baseRouterHandler;
