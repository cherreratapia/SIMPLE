import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-user-bar",
  templateUrl: "./user-bar.component.html",
  styleUrls: ["./user-bar.component.scss"]
})
export class UserBarComponent implements OnInit {
  user;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {
    this.user = this.authService.getUser();
    console.log("user", this.user);
  }

  ngOnInit() {}
  async logout() {
    try {
      const result = await this.fireAuth.auth.signOut();
      this.authService.setUser(null, null);
      this.router.navigate(["/"]);
    } catch (error) {
      console.log("error al cerrar sesión", error);
    }
  }
}
