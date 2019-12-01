import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {
  retryWhen,
  delay,
  tap,
  retry,
  catchError,
  shareReplay,
  mergeMap
} from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient, private toastrService: ToastrService) {}
  get(): Promise<any> {
    return this.http
      .get(`${environment.url}${environment.v}product`)
      .pipe(
        retryWhen((errors: Observable<any>) => {
          return errors.pipe(
            delay(1500),
            mergeMap(error => {
              if (error.status && error.status === 403) {
                this.toastrService.error(`Debe iniciar sesión nuevamente`);
              } else {
                this.toastrService.error(
                  `Reintentando...`,
                  "Ha ocurrido un error al obtener los productos",
                  {
                    timeOut: 2000
                  }
                );
              }
              return error.status === 403 ? throwError(error) : of(error);
            })
          );
        })
      )
      .toPromise();
  }

  getByPartNumber(partNumber): Promise<any> {
    return this.http
      .get(`${environment.url}${environment.v}product/${partNumber}`)
      .pipe(
        retryWhen((errors: Observable<any>) => {
          return errors.pipe(
            delay(1500),
            mergeMap(error => {
              if (error.status && error.status === 403) {
                this.toastrService.error(`Debe iniciar sesión nuevamente`);
              } else {
                this.toastrService.error(
                  `Reintentando...`,
                  "Ha ocurrido un error al obtener el detalle del producto",
                  {
                    timeOut: 2000
                  }
                );
              }
              return error.status === 403 ? throwError(error) : of(error);
            })
          );
        })
      )
      .toPromise();
  }
}
