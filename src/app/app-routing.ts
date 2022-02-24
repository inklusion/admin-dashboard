import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LogoutGuard } from './shared/guards/logout.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LogoutGuard],
    data: { title: 'Authentication' },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/authentication/sessions.module')
          .then((m) => m.SessionsModule),
      },
    ],
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/dashboard/dashboard.module')
          .then((m) => m.DashboardModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
