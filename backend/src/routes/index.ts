import { Router } from "express";
import { productsHandlers } from "./Products";
import { AxiosStatic } from "axios";
import { RedisClient } from "redis";
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
    randomizeFetch,
    productsHandlers({ axios, client }).getByParamNumber
  );

  // Add sub-routes
  router.use("/product", ProductRouter);

  // Export the base-router
  return router;
};
export default baseRouterHandler;
