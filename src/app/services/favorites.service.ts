import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../global/app-settings';
import { FavoriteMenuItemOfferPayload } from '../models/favorite-menu-item-offer-payload';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  baseUrl = `${AppSettings.P1_API_URL}/favorites`;
  constructor(private http: HttpClient) {}

  getFavorite(menuItemOfferId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${menuItemOfferId}`);
  }

  addFavorite(payload: FavoriteMenuItemOfferPayload): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/`, payload);
  }

  removeFavorite(menuItemOfferId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${menuItemOfferId}`);
  }
}
