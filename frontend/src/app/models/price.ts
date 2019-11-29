export class Price {
  offerPrice: number;
  listPrice: number;
  discount: number;
  discountPercentage: number;
  ripleyPuntos: number;
  formattedOfferPrice: number;
  formattedListPrice: number;
  formattedDiscount: number;

  constructor(IPrice: Price) {
    this.offerPrice = IPrice.offerPrice;
    this.listPrice = IPrice.listPrice;
    this.discount = IPrice.discount;
    this.discountPercentage = IPrice.discountPercentage;
    this.ripleyPuntos = IPrice.ripleyPuntos;
    this.formattedOfferPrice = IPrice.formattedOfferPrice;
    this.formattedListPrice = IPrice.formattedListPrice;
    this.formattedDiscount = IPrice.formattedDiscount;
  }
}
