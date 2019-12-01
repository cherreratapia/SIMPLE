import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/product";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService
      .get()
      .then(result => {
        console.log("result", result);
        this.productList = result.data;
        console.log(this.productList);
      })
      .catch(error => {
        console.error(`Error: `, error);
        if (error && error.status && error.status === 403) {
          console.log("error.status", error);
          this.router.navigate(["/"]);
        }
      });
  }
}
