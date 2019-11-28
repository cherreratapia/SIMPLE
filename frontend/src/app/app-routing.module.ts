import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";

const routes: Routes = [
  {
    path: "",
    component: SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
