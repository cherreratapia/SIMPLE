import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}
  get(): Promise<any> {
    return this.http
      .get(`${environment.url}${environment.v}product`)
      .toPromise();
  }

  getByPartNumber(partNumber): Promise<any> {
    return this.http
      .get(`${environment.url}${environment.v}product/${partNumber}`)
      .toPromise();
  }
}
