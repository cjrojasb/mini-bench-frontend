import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovementsListComponent } from './components/movements-list.component';
import { MovementsListRoutingModule } from './movements-list-routing.module';
import { MaterialModule } from '../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MovementsListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MovementsListRoutingModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MovementsListModule { }
