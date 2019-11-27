import { logger } from "@shared";
import { Request, Response, Router, NextFunction, Express } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { paramMissingError } from "@shared";
import { ParamsDictionary } from "express-serve-static-core";
import { RedisClient } from "redis";
import { PRODUCTS_SKU, isError } from "../../util";

const productsHandlers = ({ axios, client }: { axios: any; client: any }) => ({
  getByParamNumber: async (req: any, res: any) => {
    try {
      if (!isError()) {
        throw new Error("Error al consultar la api");
      }
      const productCached = "product:detail";
      return client.get(productCached, async (err: any, productDetail: any) => {
        if (err) {
          console.log(`Error de redis ${err}`);
        }
        try {
          if (productDetail) {
            return res.status(201).send(JSON.parse(productDetail));
          } else {
            const { data } = await axios.get(
              `https://simple.ripley.cl/api/v2/products/${req.params.id}`
            );
            client.setex(productCached, 120, JSON.stringify(data));
            return res.status(201).send(data);
          }
        } catch (error) {
          console.log(`Error al obtener producto ${error}`);
          return res.status(400).json({ error: error.message });
        }
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  get: async (req: any, res: any) => {
    try {
      if (!isError()) {
        throw new Error("Error al consultar la api");
      }
      const skuList = PRODUCTS_SKU;
      const productsListCached = "product:list";
      return client.get(
        productsListCached,
        async (err: any, productList: any) => {
          try {
            if (productList) {
              console.log("entro aqui?");
              return res.status(201).send(JSON.parse(productList));
            } else {
              const response = [];
              for (const SKU of skuList) {
                const { data } = await axios.get(
                  `https://simple.ripley.cl/api/v2/products/${SKU}`
                );
                response.push(data);
              }
              client.setex(productsListCached, 120, JSON.stringify(response));
              return res.status(201).send(response);
            }
          } catch (error) {
            console.log(`Error de redis en GET all ${error}`);
            return res.status(400).json({ error: error.message });
          }
        }
      );
    } catch (error) {
      console.log("Error en catch" + error.message);
      return res.status(400).json({ error: error.message });
    }
  }
});

export { productsHandlers };
