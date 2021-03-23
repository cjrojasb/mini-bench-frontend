import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './components/account.component';
import { AccountRoutingModule } from './account-routing.module';
import { MaterialModule } from '../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AccountRoutingModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
