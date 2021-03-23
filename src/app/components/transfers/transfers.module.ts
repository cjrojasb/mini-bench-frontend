import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransfersComponent } from './components/transfers.component';
import { TransfersRoutingModule } from './transfers-routing.module';
import { MaterialModule } from '../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TransfersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TransfersRoutingModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TransfersModule { }
