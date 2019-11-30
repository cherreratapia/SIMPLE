import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Product } from "../../models/product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  params: Subscription;
  partNumber: string;
  product: Product;
  brand: string;
  constructor(
    private activatedRoute: ActivatedRoute,
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
      console.log("error", error);
    }
  }
  ngOnDestroy() {
    this.params.unsubscribe();
  }
}
