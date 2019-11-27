import { Router } from "express";
import UserRouter from "./Users";
import { productsHandlers } from "./Products/index";
import { AxiosStatic } from "axios";
import { RedisClient } from "redis";

const baseRouterHandler = ({
  axios,
  client
}: {
  axios: AxiosStatic;
  client: RedisClient;
}) => {
  // Init router and path
  const router = Router();

  // Product Router
  const ProductRouter = Router();
  // ProductRouter.get("/", productsHandlers({ axios }).get);
  ProductRouter.get(
    "/:id",
    productsHandlers({ axios, client }).getByParamNumber
  );

  // Add sub-routes
  router.use("/users", UserRouter);
  router.use("/product", ProductRouter);

  // Export the base-router
  return router;
};
export default baseRouterHandler;
