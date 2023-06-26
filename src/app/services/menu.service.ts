import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSettings } from '../global/app-settings';
import { Menu } from '../models/menu';
import { MessageService } from 'primeng/api';

const MENU_KEY = 'menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getById(id: string): Observable<Menu> {
    return this.http.get<Menu>(`${AppSettings.P1_API_URL}/menu/${id}`);
  }

  getDefault(): Observable<Menu> {
    return this.http.get<Menu>(`${AppSettings.P1_API_URL}/menu/default`);
  }

  fetchDefault(): Observable<Menu> {
    const menu = window.sessionStorage.getItem(MENU_KEY);
    if (menu) {
      return of(JSON.parse(menu));
    }
    const menuFuture: Observable<Menu> = this.getDefault();

    menuFuture.subscribe({
      next: (value: Menu) => {
        window.sessionStorage.setItem(MENU_KEY, JSON.stringify(value));
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
      },
    });
    return menuFuture;
  }
}
