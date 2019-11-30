import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatCardModule,
  MatTabsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule
} from "@angular/material/";
import { ForgottenPasswordComponent } from "./pages/forgotten-password/forgotten-password.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorCustom } from "./services/interceptor";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth.guard";
import { ProductComponent } from "./components/product/product.component";
import { registerLocaleData } from "@angular/common";

import localeCL from "@angular/common/locales/es-CL";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
registerLocaleData(localeCL, "es-CL");

import { ToastrModule } from "ngx-toastr";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ImgViewerComponent } from './components/img-viewer/img-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SignInComponent,
    ForgottenPasswordComponent,
    ProductComponent,
    ProductDetailComponent,
    ImgViewerComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CarouselModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorCustom,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: "es-CL"
    }
  ]
})
export class AppModule {}
