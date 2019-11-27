import { IProduct } from "@entities";

export interface IProductsDao {
  getAll: () => Promise<IProduct[]>;
  add: (user: IProduct) => Promise<void>;
  update: (user: IProduct) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export class ProductsDao implements IProductsDao {
  /**
   *
   */
  public async getAll(): Promise<IProduct[]> {
    // TODO
    return [] as any;
  }

  /**
   *
   * @param product
   */
  public async add(product: IProduct): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param product
   */
  public async update(product: IProduct): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param id
   */
  public async delete(id: number): Promise<void> {
    // TODO
    return {} as any;
  }
}
