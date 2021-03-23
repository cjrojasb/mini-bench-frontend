import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AccountDataComponent } from './components/account-data.component';
import { AccountDataRoutingModule } from './account-data-routing.module';
import { MaterialModule } from '../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountDataComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AccountDataRoutingModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountDataModule { }
