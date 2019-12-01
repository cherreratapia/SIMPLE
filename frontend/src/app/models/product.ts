import { Price } from "./price";
import { Attribute } from "./attribute";
import { Shipping } from "./shipping";
import { SKU } from "./sku";
import { Warranty } from "./warranty";
import { AvailableList } from "./available-list";
import { Simple } from "./simple";

export class Product {
  uniqueID: number;
  partNumber: string;
  name: string;
  locals: AvailableList;
  fullImage: string;
  images: string[];
  prices: Price;
  shortDescription: string;
  longDescription: string;
  definingAttributes: string[];
  attributes: Attribute[];
  shipping: Shipping;
  xCatEntryCategory: string;
  productString: string;
  SKUs: SKU[];
  isMarketplaceProduct: boolean;
  marketplace: Object;
  warranties: Warranty;
  url: string;
  thumbnailImage: string;
  simple: Simple;
  single: boolean;

  constructor(IProduct: Product) {
    this.uniqueID = IProduct.uniqueID;
    this.partNumber = IProduct.partNumber;
    this.name = IProduct.name;
    this.locals = IProduct.locals;
    this.fullImage = IProduct.fullImage;
    this.images = IProduct.images;
    this.prices = IProduct.prices;
    this.shortDescription = IProduct.shortDescription;
    this.longDescription = IProduct.longDescription;
    this.definingAttributes = IProduct.definingAttributes;
    this.attributes = IProduct.attributes;
    this.shipping = IProduct.shipping;
    this.xCatEntryCategory = IProduct.xCatEntryCategory;
    this.productString = IProduct.productString;
    this.SKUs = IProduct.SKUs;
    this.isMarketplaceProduct = IProduct.isMarketplaceProduct;
    this.marketplace = IProduct.marketplace;
    this.warranties = IProduct.warranties;
    this.url = IProduct.url;
    this.thumbnailImage = IProduct.thumbnailImage;
    this.simple = IProduct.simple;
    this.single = IProduct.single;
  }
}
