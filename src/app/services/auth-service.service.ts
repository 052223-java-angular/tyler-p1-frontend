import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../models/register-payload';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8080/p1/api';

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/register`, payload);
  }
}
