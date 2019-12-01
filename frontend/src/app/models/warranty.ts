import { Price } from "./price";

export interface WarrantyPrice {
  priceValue: number;
  priceUsage: string;
  formattedPriceValue: string;
}
export class Warranty {
  shortDescription: string;
  price: WarrantyPrice;
  type: string;
  name: string;
  quantity: number;
  partNumber: number;
  thumbnail: string;
  uniqueID: number;
}
