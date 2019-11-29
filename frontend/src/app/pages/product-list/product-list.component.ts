import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  productList = ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .get()
      .then(result => (this.productList = result.data))
      .catch(err => console.log("error", err));
  }
}
