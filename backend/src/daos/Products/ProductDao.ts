import { IProduct } from "@entities";
import { AxiosStatic } from "axios";
import { RedisClient, RedisError } from "redis";
import { PRODUCTS_SKU } from "../../util/index";
import { Request } from "express";

export interface IProductDao {
  getAll: () => Promise<IProduct[]>;
  getById: (id: String) => Promise<void>;
}

export class ProductDao implements IProductDao {
  axios: AxiosStatic;
  redis: RedisClient;

  constructor(axios: AxiosStatic, redis: RedisClient) {
    this.axios = axios;
    this.redis = redis;
  }

  public async getAll(): Promise<any> {}

  /**
   *
   * @param id
   */
  public async getById(id: String): Promise<any> {
    
  }
}
