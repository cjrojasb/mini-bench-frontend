import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {
  accountForm   : FormGroup;
  sendingData: boolean = false;

  constructor(
    private builder: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.accountForm = this.builder.group({
      name    : [null, [Validators.pattern(/^[a-zA-Z\s]*$/),Validators.required]],
      rut     : [null,Validators.required],
      email   : [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
    });
  }

  submitForm(data: any): void {
    this.sendingData = true;
    this.accountService.setAccount(data).subscribe(
      (res) => {
        console.log(res);
        if (res.status === 200) {
          this.sendingData = false;
          this.launchSnackBar(
            'Cuenta agregada correctamente.',
            'success-snackbar'
          );
          this.resetForm();
        }
      },
      (err) => {
        console.log(err);
        this.sendingData = false;
        this.launchSnackBar(
          `${err.error}`,
          'danger-snackbar'
        );
        this.accountForm.get('rut').setErrors({ 'incorrect': true, });
      }
    );
  }

  launchSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'x', {
      duration          : 10000,
      horizontalPosition: 'right',
      verticalPosition  : 'bottom',
      panelClass        : [panelClass],
    });
  }

  resetForm(): void {
    const { accountForm } = this;
    accountForm.reset();

    for (const key of Object.keys(accountForm.controls)) {
      accountForm.get(key).setErrors(null);
    }
  }
}
