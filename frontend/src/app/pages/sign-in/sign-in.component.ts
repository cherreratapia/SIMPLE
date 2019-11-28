import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  userData: any = {};
  login = this.fb.group({
    user: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });
  register = this.fb.group({
    name: ["", [Validators.required]],
    user: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private fireAuth: AngularFireAuth,
    private afs: AngularFirestore
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

  signIn() {
    console.log("login");
  }
  signUp() {
    console.log("Register");
    this.SignUpAuth(
      this.register.get("user").value,
      this.register.get("password").value
    );
  }

  SignUpAuth(email, password) {
    return this.fireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SetUserData(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      });
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
