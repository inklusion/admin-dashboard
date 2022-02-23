import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutGuard } from './shared/guards/logout.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LogoutGuard],
    data: { title: 'Session' },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/authentication/sessions.module').then(m => m.SessionsModule)
      }
    ]
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
