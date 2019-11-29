export interface IUser {
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoURL: string;
  uid: string;
  token: string;
}
export class User implements IUser {
  email: string = "";
  emailVerified: boolean = false;
  displayName: string = "";
  photoURL: string = "";
  uid: string = "";
  token: string = "";

  constructor(
    email: string,
    emailVerified: boolean,
    displayName: string,
    photoURL: string,
    uid: string,
    token?: string
  ) {
    this.email = email;
    this.emailVerified = emailVerified;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.uid = uid;
    if (token) {
      this.token = token;
    }
  }
}
