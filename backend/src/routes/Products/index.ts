import { logger } from "@shared";
import { Request, Response } from "express";
import { RedisError } from "redis";
import { PRODUCTS_SKU } from "../../util/index";
import { ProductDao } from "../../daos/";

const productsHandlers = ({ axios, client }: { axios: any; client: any }) => ({
  getByParamNumber: async (req: Request, res: Response) => {
    if (req.params.id) {
      const productCached = `product:${req.params.id}`;
      return client.get(productCached, async (err: any, productDetail: any) => {
        if (err) {
          console.log(`Error de redis ${err}`);
        }
        try {
          if (productDetail) {
            return res.status(200).json({ data: JSON.parse(productDetail) });
          } else {
            const { data } = await axios.get(
              `https://simple.ripley.cl/api/v2/products/${req.params.id}`
            );
            client.setex(productCached, 120, JSON.stringify(data));
            return res.status(200).json({ data });
          }
        } catch (error) {
          console.log(`Error al obtener producto ${error}`);
          return res
            .status(400)
            .json({ error: "Error al obtener el detalle del producto" });
        }
      });
    }
    return res
      .status(400)
      .json({ error: "Error al obtener el detalle del producto" });
  },
  get: (req: Request, res: Response) => {
    const productsListCached = "product:list";
    const skuList = PRODUCTS_SKU;
    let products: any = [];
    return client.get(
      productsListCached,
      async (err: any, productList: any) => {
        try {
          if (productList) {
            console.log("product cached");
            res.status(200).json({ data: JSON.parse(productList) });
          } else {
            console.log("no cached");
            for (const SKU of skuList) {
              const { data } = await axios.get(
                `https://simple.ripley.cl/api/v2/products/${SKU}`
              );
              products.push(data);
            }
            client.setex(productsListCached, 120, JSON.stringify(products));
            res.status(200).json({ data: products });
          }
        } catch (error) {
          console.log(`Error de redis en GET all ${error}`);
          return res
            .status(400)
            .json({ error: "Error al obtener productos desde REDIS" });
        }
      }
    );
  }
});

export { productsHandlers };
