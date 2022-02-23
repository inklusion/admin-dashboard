import { Routes } from "@angular/router";
import { DefaultDashboardComponent } from "./home/dashboard.component";


export const DashboardRoutes: Routes = [
  {
    path: "",
    component: DefaultDashboardComponent,
    data: { title: "Dashboard", breadcrumb: "DASHBOARD" }
  },
];