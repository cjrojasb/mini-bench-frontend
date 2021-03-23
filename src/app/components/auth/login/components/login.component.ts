import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>()
  loginForm  : FormGroup;
  sendingData: boolean = false;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.builder.group({
      email   : [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
    });
  }

  onLogIn(data: any): void {
    this.authService.logIn(data).subscribe(
      (res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem('access_token', res.body.token);
          this.loggedIn.emit(true);
          this.router.navigate(['mi-cuenta/registro']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
