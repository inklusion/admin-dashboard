import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LogoutGuard } from 'app/shared/guards/logout.guard';
import { AppConfirmService } from './components/app-confirm/app-confirm.service';
import { AppLoaderService } from './components/app-loader/app-loader.service';
import { SharedComponentsModule } from './components/shared-components';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { NavigationService } from './services/navigation.service';
import { RoutePartsService } from './services/route-parts.service';



@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    LogoutGuard,
    RoutePartsService,
    AppLoaderService,
    AppConfirmService,
    NavigationService,
  ],
  exports: [
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule
  ]
})
export class SharedModule { }
