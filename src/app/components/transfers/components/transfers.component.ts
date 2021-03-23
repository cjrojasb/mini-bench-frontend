import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  transfersForm : FormGroup;
  userId        : string;
  userRut       : string;
  accountId     : string;
  accountBalance: number;
  sendingData   : boolean = false;
  accounts      : any;

  constructor(
    private builder: FormBuilder,
    private accountService: AccountService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAccounts();
    this.decodeToken();
    this.initializeForm();
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            this.accounts = res.body;
          }
        },
        (err) => {
          console.log(err);
        }
      );
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
    this.transfersForm = this.builder.group({
      accountId     : [null,Validators.required],
      balance: [null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.required]],
    });
  }

  submitForm(data: any): void {
    this.sendingData = true;
    let destinationAccountId     = this.transfersForm.get('accountId').value;
    let destinationAccountAmount = this.transfersForm.get('balance').value;

    this.accountService.updatAccountBalance(destinationAccountId, data).subscribe(
      (res) => {
        console.log(res);
        if (res.status === 200) {
          this.updateCurrentAmount(destinationAccountAmount);
          this.launchSnackBar(
            'Transferencia realizada correctamente.',
            'success-snackbar'
          );
          this.sendingData = false;
          this.resetForm();
        }
      },
      (err) => {
        console.log(err);
        this.launchSnackBar(
          'Ocurrio un error al realizar la transfeencia',
          'danger-snackbar'
        );
        this.sendingData = false;
      }
    );
  }

  updateCurrentAmount(amount: any): void {
    const postData = this.setPostData(amount);
    this.accountService.updatAccountBalance(this.accountId, postData)
    .subscribe(
      (res) => {
        console.log(res);
        this.accountBalance = res.body.updatedAccount.balance;
      },
      (err) => {
        console.log(err);
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
    const { transfersForm } = this;
    transfersForm.reset();

    for (const key of Object.keys(transfersForm.controls)) {
      transfersForm.get(key).setErrors(null);
    }
  }


  setPostData(balance: any) {
    let incomingAmount = balance !== null ? parseInt(balance) : 0;
    let curentBalance  = this.accountBalance !== null ? parseInt(this.accountBalance.toString()): 0;
    let amount = Math.abs(incomingAmount - curentBalance);
    const postData = {
      balance: amount
    };

    return postData;
  }
}
