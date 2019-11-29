export interface BlackList {
  blackList: false;
}
export interface Promotion {
  stock: boolean;
  badge: boolean;
}
export class AvailableList {
  outOfStockList: BlackList;
  unavailableList: BlackList;
  promotion: Promotion;
}
