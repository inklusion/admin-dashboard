import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LogoutGuard } from 'app/shared/guards/logout.guard';
import { AppLoaderService } from './components/app-loader/app-loader.service';
import { SharedComponentsModule } from './components/shared-components';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { NavigationService } from './services/navigation.service';
import { RoutePartsService } from './services/route-parts.service';



@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedComponentsModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    LogoutGuard,
    RoutePartsService,
    AppLoaderService,
    NavigationService,
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class SharedModule { }
