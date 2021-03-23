import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TakeOutAccountComponent } from './components/take-out-account.component';
import { TakeOutAccountRoutingModule } from './take-out-account-routing.module';
import { MaterialModule } from '../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TakeOutAccountComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TakeOutAccountRoutingModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TakeOutAccountModule { }
