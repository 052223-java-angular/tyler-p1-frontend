import { Injectable } from '@angular/core';
import { AppSettings } from './global/app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = `${AppSettings.P1_API_URL}/order`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
