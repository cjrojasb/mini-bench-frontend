import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>()
  registerForm: FormGroup;
  sendingData : boolean = false;
  isLogged    : any = false;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.builder.group({
      email   : [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
      name    : [null, [Validators.pattern(/^[a-zA-Z\s]*$/), Validators.required]],
      lastName: [null, [Validators.pattern(/^[a-zA-Z\s]*$/), Validators.required]],
      rut     : [null, Validators.required],
    });
  }

  onRegister(data: any): void {
    this.sendingData = true;
    this.authService.signUp(data).subscribe(
      (res) => {
        console.log(res);
        if (res.status === 200) {
          this.sendingData = false;
          localStorage.setItem('access_token', res.body.token);
          this.loggedIn.emit(true);
          this.router.navigate(['mi-cuenta/inicio']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
