import { Inject, Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { IAuthenticationService } from "authentication-inklusion";

@Injectable()
export class LogoutGuard implements CanActivate {

  constructor(
    @Inject('AuthService') private authenticationService: IAuthenticationService,
  ) { }

  canActivate() {
    if (this.authenticationService.currentUserValue) {
      this.authenticationService.logout();
    }
    return true;
  }
}
