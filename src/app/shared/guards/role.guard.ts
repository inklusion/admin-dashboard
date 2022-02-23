import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    public auth: AuthenticationService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.auth.currentUserValue;

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
