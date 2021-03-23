import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // private apiUrl     = environment.apiAdminUrl;
  // private adminToken = environment.adminToken;
  private headers    : any;

  constructor(private http: HttpClient) {
    this.setHeaders();
  }

  setHeaders() {
    this.headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${this.adminToken}`,
    });
  }

  setLogIn(data: any): void {
    console.log(data)
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('userData', JSON.stringify(data));
  }

  logout(): void {
    localStorage.removeItem('isLogged');
  }
}
