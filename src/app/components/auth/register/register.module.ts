import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RegisterRoutingModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
