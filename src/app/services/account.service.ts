import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl    = environment.apiUrl;
  private authToken = localStorage.getItem('access_token');
  private headers   : any;

  constructor(private http: HttpClient) {
    this.setHeaders();
  }

  setHeaders() {
    this.headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  getAccounts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/private/accounts`, {
      headers: this.headers,
      observe: 'response'
    });
  }

  getAccountByRut(rut: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/private/accounts/${rut}`, {
      headers: this.headers,
      observe: 'response'
    });
  }

  setAccount(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/private/accounts`, data, {
      headers: this.headers,
      observe: 'response'
    });
  }

  updatAccountBalance(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/private/accounts/update/${id}`, data, {
      headers: this.headers,
      observe: 'response'
    });
  }
}
