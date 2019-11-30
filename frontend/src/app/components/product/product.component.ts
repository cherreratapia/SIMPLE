import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/models/product";
import { Router } from "@angular/router";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  brand: string;
  constructor(private router: Router) {}

  ngOnInit() {
    if (this.product) {
      this.brand = this.product.attributes.find(
        el => el.name.toUpperCase() === "MARCA"
      ).value;
    }
  }
  goToDetail(product: Product) {
    this.router.navigate(["product-detail", product.partNumber]);
  }
}
