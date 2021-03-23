import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
        import('../account-data/account-data.module').then((m) => m.AccountDataModule),
      },
      {
        path: 'listado-de-movimientos',
        loadChildren: () =>
        import('../movements-list/movements-list.module').then((m) => m.MovementsListModule),
      },
      {
        path: 'registro',
        loadChildren: () =>
        import('../register-account/register-account.module').then((m) => m.RegisterAccountModule),
      },
      {
        path: 'cargar-saldo',
        loadChildren: () =>
        import('../load-account/load-account.module').then((m) => m.LoadAccountModule),
      },
      {
        path: 'retirar-saldo',
        loadChildren: () =>
        import('../take-out-account/take-out-account.module').then((m) => m.TakeOutAccountModule),
      },
      {
        path: 'transferencias',
        loadChildren: () =>
        import('../transfers/transfers.module').then((m) => m.TransfersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
