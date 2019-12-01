import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: User;

  constructor() {
    let _userNoParse = sessionStorage.getItem("user");
    if (_userNoParse) {
      let _user = JSON.parse(_userNoParse);
      this.user = new User(
        _user.email,
        _user.emailVerified,
        _user.displayName,
        _user.photoURL,
        _user.uid,
        _user.token
      );
    }
  }

  public setUser(User: User, token: string) {
    this.user = User;
    if (this.user) {
      this.user.token = token;
      sessionStorage.setItem("user", JSON.stringify(this.user));
    } else {
      sessionStorage.setItem("user", "");
    }
  }
  public getUser() {
    return this.user;
  }
}
