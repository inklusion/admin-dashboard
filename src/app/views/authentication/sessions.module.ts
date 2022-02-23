import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from 'app/shared/components/shared-components';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { AuthenticationCommonModule } from 'authentication-inklusion';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LoginTemplateComponent } from './login-template/login-template.component';
import { SessionsRoutes } from "./sessions.routing";


@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FlexLayoutModule,
    NgScrollbarModule,
    TranslateModule,
    AuthenticationCommonModule,
    RouterModule.forChild(SessionsRoutes)
  ],
  declarations: [LoginTemplateComponent],
  providers: [
    ReCaptchaV3Service,
    { provide: "ReCaptchaV3Service", useExisting: forwardRef(() => ReCaptchaV3Service) },
  ]
})
export class SessionsModule { }