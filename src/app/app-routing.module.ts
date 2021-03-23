import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./components/auth/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./components/auth/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'mi-cuenta',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
