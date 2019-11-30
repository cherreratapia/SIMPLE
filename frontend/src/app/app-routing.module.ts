import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { ForgottenPasswordComponent } from "./pages/forgotten-password/forgotten-password.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";

const routes: Routes = [
  {
    path: "",
    component: SignInComponent
  },
  {
    path: "reset-password",
    component: ForgottenPasswordComponent
  },
  {
    path: "product",
    component: ProductListComponent
    // canActivate: [AuthGuard]
  },
  {
    path: "product-detail/:partNumber",
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
