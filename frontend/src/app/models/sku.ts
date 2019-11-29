import { SkuPrice } from "./sku-price";
import { Attribute } from "./attribute";

export class SKU {
  Price: SkuPrice;
  SKUUniqueID: number;
  partNumber: string;
  xCatEntryQuantity: number;
  ineligible: boolean;
  Attributes: Attribute[];
  isMainProduct: boolean;
}
