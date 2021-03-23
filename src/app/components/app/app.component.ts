import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../auth/login/components/login.component';
import { RegisterComponent } from '../auth/register/components/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loginSubscription: any;
  isLogged         : boolean = false;
  title            = 'mini-bench-frontend';

  onActivate(component) {
    if(component instanceof LoginComponent) {
      this.loginSubscription = component.loggedIn.subscribe((status) => {
        this.isLogged = status;
      });
    } else if (component instanceof RegisterComponent) {
      this.loginSubscription = component.loggedIn.subscribe((status) => {
        this.isLogged = status;
      });
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('access_token') !== null) {
      this.isLogged = true;
    }
  }

  onDeactivate() {}
}
