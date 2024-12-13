import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ICustomResponseService } from '@libs-rast/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.authServiceUrl;

  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

  private handleError(error: HttpErrorResponse): Observable<any> {
    const message = error?.error?.error?.message || 'Um erro inesperado aconteceu!';
    return of(error.error);
  }

  login(username: string, password: string) {
    return this.http.post<ICustomResponseService<any>>(`${this.apiUrl}/login`, { username, password }, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  me(token: string) {
    const headers = this.headers;
    headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/me/${token}`, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  logout(token: string) {
    const headers = this.headers;
    headers.set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/logout/${token}`, { headers: headers }).pipe(catchError(this.handleError));
  }
}
