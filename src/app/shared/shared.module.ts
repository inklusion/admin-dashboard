import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogoutGuard } from 'app/shared/guards/logout.guard';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { RoutePartsService } from './services/route-parts.service';



@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    LogoutGuard,
    RoutePartsService
  ],
  exports: [
  ]
})
export class SharedModule { }
