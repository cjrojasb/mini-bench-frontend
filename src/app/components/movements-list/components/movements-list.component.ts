import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.scss']
})
export class MovementsListComponent implements OnInit {
  authForm   : FormGroup;
  sendingData: boolean = false;

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.authForm = this.builder.group({
      email   : [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
    });
  }

  submitForm(data: any): void {
    console.log(data)
  }
}
