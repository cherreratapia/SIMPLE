import { Router } from "express";
import UserRouter from "./Users";
import { productsHandlers } from "./Products/index";
import { AxiosStatic } from "axios";
import { RedisClient } from "redis";
import retry from "async-retry";
import randomizeFetch from "../shared/middlewares/randomizeFetch";

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
  ProductRouter.get(
    "/",
    randomizeFetch,
    productsHandlers({ axios, client }).get
  );
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
