import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { forwardRef, LOCALE_ID, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthenticationModuleConfig, AUTHENTICATION_CONFIG } from 'authentication-inklusion';
import { configuration } from 'configuration/configuration';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { ServiceLocator } from './service-locator';
import { SharedComponentsModule } from './shared/components/shared-components';
import { ErrorInterceptor } from './shared/interceptors/errorInterceptor';
import { fakeBackendProvider } from './shared/interceptors/fakeBackendInterceptor';
import { AuthenticationService } from './shared/services/authentication.service';
import { SharedModule } from './shared/shared.module';
import { SessionsModule } from './views/authentication/sessions.module';


const authenticationConfig: AuthenticationModuleConfig = configuration.authConfig;

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedComponentsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SessionsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    { provide: AUTHENTICATION_CONFIG, useValue: authenticationConfig },
    { provide: "AuthService", useExisting: forwardRef(() => AuthenticationService) },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: authenticationConfig.recaptcha.publicKey },
    { provide: "ReCaptchaV3Service", useExisting: forwardRef(() => ReCaptchaV3Service) },
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT' // 'de-DE' for Germany, 'fr-FR' for France ...
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public dialog: MatDialog) {
    ServiceLocator.dialog = dialog;
  }
}