import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class LogoutGuard implements CanActivate {

  constructor(
    public auth: AuthenticationService,
  ) { }

  canActivate() {
    if (this.auth.currentUserValue) {
      this.auth.logout();
    }
    return true;
  }
}
