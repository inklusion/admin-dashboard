import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'app/shared/services/authentication.service';

@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['./login-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginTemplateComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snack: MatSnackBar,
    private _translateService: TranslateService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.activate) {
        this.authenticationService.activate(params.activate).subscribe({
          next: () => {
            this.snack.open(this._translateService.instant("USER_ACTIONS.ACCOUNT_ACTIVATED"), 'OK', { duration: 4000 })
            this.router.navigateByUrl(`/authentication`);
          },
          complete: () => {
            this.snack.open(this._translateService.instant("USER_ACTIONS.ACCOUNT_ACTIVATED"), 'OK', { duration: 4000 })
            this.router.navigateByUrl(`/authentication`);
          },
          error: () => {
            this.router.navigateByUrl(`/authentication`);
          }
        })
      }
    });
  }
}