export class Price {
  offerPrice: number;
  listPrice: number;
  discount: number;
  discountPercentage: number;
  cardPrice: number;
  ripleyPuntos: number;
  formattedOfferPrice: number;
  formattedListPrice: number;
  formattedDiscount: number;
  formattedCardPrice: number;

  constructor(IPrice: Price) {
    this.offerPrice = IPrice.offerPrice;
    this.listPrice = IPrice.listPrice;
    this.discount = IPrice.discount;
    this.cardPrice = IPrice.cardPrice;
    this.discountPercentage = IPrice.discountPercentage;
    this.ripleyPuntos = IPrice.ripleyPuntos;
    this.formattedOfferPrice = IPrice.formattedOfferPrice;
    this.formattedCardPrice = IPrice.formattedCardPrice;
    this.formattedListPrice = IPrice.formattedListPrice;
    this.formattedDiscount = IPrice.formattedDiscount;
  }
}
