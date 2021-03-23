import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovementsListService {
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

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/crud/holiday/${id}`, {
      headers: this.headers,
      observe: 'response'
    });
  }
}
