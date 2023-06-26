import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from './global/app-settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  baseUrl = `${AppSettings.P1_API_URL}/point`;

  constructor(private http: HttpClient) {}

  getPoints(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/`);
  }
}
