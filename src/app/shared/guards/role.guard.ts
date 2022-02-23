import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { IAuthenticationService } from "authentication-inklusion";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject('AuthService') private authenticationService: IAuthenticationService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      if (route.data &&
        route.data.roles &&
        route.data.roles.includes(currentUser.userType)) {
        return true;
      }

      this.router.navigate(['']);
    }

    return false;
  }
}
