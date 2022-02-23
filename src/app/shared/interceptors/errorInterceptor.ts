import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IAuthenticationService } from 'authentication-inklusion';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppLoaderService } from '../components/app-loader/app-loader.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        @Inject('AuthService') private authenticationService: IAuthenticationService,
        private snack: MatSnackBar,
        private _translateService: TranslateService,
        private router: Router,
        private loader: AppLoaderService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                const error = err?.error?.message || err?.statusText;
                this.loader.close();
                if (err.status === 401) { // auto logout if 401 response returned from api (token expired)
                    this.snack.open(this._translateService.instant("SESSION_EXPIRED"), 'OK', { duration: 4000 })
                    this.authenticationService.logout();
                    this.router.navigate(['/authentication'], { queryParams: { return: this.router.url } });
                    return throwError(() => error);
                }
                if (error) {
                    this.snack.open(this._translateService.instant("ERROR_OCURRED") + " \n " + error, 'OK', { duration: 4000 })
                } else {
                    this.snack.open(this._translateService.instant("ERROR_OCURRED"), 'OK', { duration: 4000 })
                }

                return throwError(() => error);
            }),
        )
    }
}