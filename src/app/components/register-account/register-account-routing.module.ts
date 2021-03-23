import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterAccountComponent } from './components/register-account.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAccountRoutingModule { }
