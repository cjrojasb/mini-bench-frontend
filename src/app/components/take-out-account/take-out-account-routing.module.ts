import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TakeOutAccountComponent } from './components/take-out-account.component';

const routes: Routes = [
  {
    path: '',
    component: TakeOutAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TakeOutAccountRoutingModule { }
