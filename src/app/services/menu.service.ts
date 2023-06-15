import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../global/app-settings';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getById(id: string): Observable<Menu> {
    return this.http.get<Menu>(`${AppSettings.P1_API_URL}/menu/${id}`);
  }
}
