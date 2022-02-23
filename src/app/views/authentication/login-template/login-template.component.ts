import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationModuleConfig, AUTHENTICATION_CONFIG, IAuthenticationService } from 'authentication-inklusion';

@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['./login-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginTemplateComponent {

  constructor(
    @Inject('AuthService') private authenticationService: IAuthenticationService,
    @Inject(AUTHENTICATION_CONFIG) public config: AuthenticationModuleConfig,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private _translateService: TranslateService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.activate) {
        this.authenticationService.activate(params.activate).subscribe({
          next: () => {
            this.snack.open(this._translateService.instant("USER_ACTIONS.ACCOUNT_ACTIVATED"), 'OK', { duration: 4000 })
            this.router.navigateByUrl(this.config.authenticationPath);
          },
          complete: () => {
            this.snack.open(this._translateService.instant("USER_ACTIONS.ACCOUNT_ACTIVATED"), 'OK', { duration: 4000 })
            this.router.navigateByUrl(this.config.authenticationPath);
          },
          error: () => {
            this.router.navigateByUrl(this.config.authenticationPath);
          }
        })
      }
    });
  }
}