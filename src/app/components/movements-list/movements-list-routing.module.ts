import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovementsListComponent } from './components/movements-list.component';

const routes: Routes = [
  {
    path: '',
    component: MovementsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsListRoutingModule { }
