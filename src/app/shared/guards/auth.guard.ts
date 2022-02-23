import { Inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationModuleConfig, AUTHENTICATION_CONFIG, IAuthenticationService } from "authentication-inklusion";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject('AuthService') private authenticationService: IAuthenticationService,
    @Inject(AUTHENTICATION_CONFIG) public config: AuthenticationModuleConfig,
    private router: Router,
    private snack: MatSnackBar,
  ) { }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return true;
    }

    this.snack.open('Please Login to Access this page', 'OK', { duration: 4000 });

    this.router.navigate([this.config.authenticationPath], {
      queryParams: {
        return: state.url
      }
    });

    return false;
  }
}
