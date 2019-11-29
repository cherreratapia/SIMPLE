import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgotten-password",
  templateUrl: "./forgotten-password.component.html",
  styleUrls: ["./forgotten-password.component.scss"]
})
export class ForgottenPasswordComponent implements OnInit {
  emailCtrl: FormControl = new FormControl(null, Validators.required);
  showMessage: boolean = false;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {}

  async resetPassword() {
    await this.fireAuth.auth.sendPasswordResetEmail(this.emailCtrl.value);
    this.emailCtrl.errors;
    this.showMessage = true;
  }

  goBack() {
    this.router.navigateByUrl("/");
  }
}
