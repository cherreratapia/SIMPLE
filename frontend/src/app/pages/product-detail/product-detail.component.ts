import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Product } from "../../models/product";
import { ProductService } from "src/app/services/product.service";

import { OwlOptions } from "ngx-owl-carousel-o";
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  partNumber: string;
  product: Product;
  brand: string;
  customOptions: OwlOptions = {
    autoWidth: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    nav: true
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.partNumber = this.activatedRoute.snapshot.params.partNumber;
  }

  async ngOnInit() {
    try {
      const { data } = await this.productService.getByPartNumber(
        this.partNumber
      );
      this.product = data;
      this.brand = this.product.attributes.find(
        el => el.name.toUpperCase() === "MARCA"
      ).value;
      console.log("this.product", this.product);
    } catch (error) {
      console.error(`Error: `, error);
      if (error && error.status && error.status === 403) {
        this.router.navigate(["/"]);
      }
    }
  }

  goBack() {
    this.router.navigate(["/product"]);
  }
}
