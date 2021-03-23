import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  logIn(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data, {
      observe: 'response'
    });
  }

  logOut(): void {
    localStorage.removeItem('access_token');
  }

  loggedIn(): boolean {
    return localStorage.getItem('access_token') ? true : false;
  }

  signUp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, data, {
      observe: 'response'
    });
  }
}
