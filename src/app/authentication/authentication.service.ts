import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthModel} from './models/auth.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authURL = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/auth/';  // URL to web api
  private token?: string;

  constructor(private http: HttpClient) { }

  getAccessToken(login: string, pass: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(this.authURL + 'login', { email: login, password: pass }).pipe(
      tap( res => this.token = res.access_token)
    );
  }

  getToken(): string {
    if (this.token) {
      return this.token;
    }
    return '';
  }

  isLogged(): boolean {
    if (this.token) {
      return true;
    }
    return false;
  }

  disconnect(): void {
    this.token = '';
  }

}
