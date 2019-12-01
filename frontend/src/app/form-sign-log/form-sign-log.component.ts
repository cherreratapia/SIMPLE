import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import {
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";

@Component({
  selector: "app-form-sign-log",
  templateUrl: "./form-sign-log.component.html",
  styleUrls: ["./form-sign-log.component.scss"]
})
export class FormSignLogComponent implements OnInit {
  @Input("title") title: string;
  @Input("formGroup") formGroup: FormGroup;
  @Input("buttonMessage") buttonMessage: string;
  @Input("type") type: string;

  error: boolean = false;
  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {}
  forgotPassword() {
    this.router.navigate(["reset-password"]);
  }

  async signIn(_email?: string, _password?: string) {
    this.error = false;
    let email: string;
    let password: string;
    if (_email && _password) {
      email = _email;
      password = _password;
    }
    email = this.formGroup.get("email").value;
    password = this.formGroup.get("password").value;
    try {
      const { user } = await this.fireAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await user.getIdToken();
      const _user = new User(
        user.email,
        user.emailVerified,
        user.displayName,
        user.photoURL,
        user.uid,
        token
      );
      this.authService.setUser(_user, token);
      this.router.navigate(["product"]);
    } catch (err) {
      if ((err.code = "auth/wrong-password")) {
        this.error = true;
      }
      console.log("error", this.error);
    }
  }

  async signUp() {
    try {
      const email = this.formGroup.controls.email.value;
      const password = this.formGroup.controls.password.value;
      const {
        user
      }: {
        user: firebase.User;
      } = await this.fireAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        await this.signIn(email, password);
        console.log("result", user);
        const us = this.SetUserData(user);
      } else {
        console.log("error...");
      }
    } catch (error) {
      console.log("error > ", error.message);
    }
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }
}
