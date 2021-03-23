import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { UserService } from '../../../services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss']
})
export class AccountDataComponent implements OnInit {
  userId: string;
  userData: any;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.decodeToken();
    this.getAccounts();
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
            this.userData = res.body;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
