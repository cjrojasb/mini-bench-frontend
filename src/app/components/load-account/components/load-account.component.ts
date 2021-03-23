import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';
import { AccountService } from '../../../services/account.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-load-account',
  templateUrl: './load-account.component.html',
  styleUrls: ['./load-account.component.scss']
})
export class LoadAccountComponent implements OnInit {
  userId        : string;
  userRut       : string;
  accountId     : string;
  accountBalance: number;
  accountForm   : FormGroup;
  sendingData   : boolean = false;

  constructor(
    private builder: FormBuilder,
    private accountService: AccountService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.decodeToken();
  }

  decodeToken(): void {
    const decodeToken = jwt_decode(localStorage.getItem('access_token'));
    this.userId       = decodeToken['_id'];
    this.getUser(this.userId);
  }

  getUser(id: string): void {
    this.userService.getUser(id)
      .subscribe(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            this.userRut = res.body.rut;
            this.getAccountByRut();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAccountByRut(): void {
    this.accountService.getAccountByRut(this.userRut)
      .subscribe(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            this.accountId      = res.body._id;
            this.accountBalance = res.body.balance;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  initializeForm() {
    this.accountForm = this.builder.group({
      balance: [null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.required]],
    });
  }

  submitForm(data: any): void {
    const postData = this.setPostData(data);
    this.sendingData = true;
    this.accountService.updatAccountBalance(this.accountId, postData)
    .subscribe(
      (res) => {
        console.log(res);
        this.accountBalance = res.body.updatedAccount.balance;
        this.resetForm();
        this.sendingData = false;
        this.launchSnackBar(
          'Saldo agregado correctamente.',
          'success-snackbar'
        );
      },
      (err) => {
        this.sendingData = false;
        this.launchSnackBar(
          'Ocurrio un errorr al agregar el saldo.',
          'danger-snackbar'
        );
        console.log(err);
      }
    );
  }

  setPostData(data: any) {
    let incomingAmount = data.balance !== null ? parseInt(data.balance) : 0;
    let curentBalance  = this.accountBalance !== null ? parseInt(this.accountBalance.toString()): 0;
    let amount = Math.abs(incomingAmount + curentBalance);
    const postData = {
      balance: amount
    };

    return postData;
  }

  resetForm(): void {
    const { accountForm } = this;
    accountForm.reset();

    for (const key of Object.keys(accountForm.controls)) {
      accountForm.get(key).setErrors(null);
    }
  }

  launchSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'x', {
      duration          : 10000,
      horizontalPosition: 'right',
      verticalPosition  : 'bottom',
      panelClass        : [panelClass],
    });
  }
}
