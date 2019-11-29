import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  userData: any = {};
  login = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });
  register = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private fireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  forgotPassword() {
    this.router.navigate(["reset-password"]);
  }

  async signIn(email: string, password: string) {
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
    } catch (error) {
      console.log("error", error);
    }
  }

  async signUp() {
    try {
      const email = this.register.controls.email.value;
      const password = this.register.controls.password.value;
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
