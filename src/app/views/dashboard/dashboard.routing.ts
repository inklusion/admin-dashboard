import { Routes } from '@angular/router';
import { AdminsComponent } from './admin/admin.component';
import { DefaultDashboardComponent } from './home/dashboard.component';


export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DefaultDashboardComponent,
    data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' },
  },
  {
    path: 'users/admin',
    component: AdminsComponent,
    data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' },
  },
];
