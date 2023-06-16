import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../models/register-payload';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { LoginPayload } from '../models/login-payload';
import { AppSettings } from '../global/app-settings';
import { RefreshTokenPayload } from '../models/refresh-token-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${AppSettings.P1_API_URL}/auth`;

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register`, payload);
  }

  login(payload: LoginPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/login`, payload);
  }

  refreshToken(payload: RefreshTokenPayload) {
    return this.http.post(`${this.baseUrl}/refreshToken`, payload);
  }
}
