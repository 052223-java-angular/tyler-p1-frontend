import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../models/register-payload';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { LoginPayload } from '../models/login-payload';
import { AppSettings } from '../global/app-settings';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<void> {
    return this.http.post<void>(
      `${AppSettings.P1_API_URL}/auth/register`,
      payload
    );
  }

  login(payload: LoginPayload): Observable<Auth> {
    return this.http.post<Auth>(
      `${AppSettings.P1_API_URL}/auth/login`,
      payload
    );
  }
}
