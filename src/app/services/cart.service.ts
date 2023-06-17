import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../global/app-settings';
import { Observable } from 'rxjs';
import { CartMenuItemOffer } from '../models/cart-menu-item-offer';
import { AddCartMenuItemOfferPayload } from '../models/add-cart-menu-item-offer-payload';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = `${AppSettings.P1_API_URL}/cart`;

  constructor(private http: HttpClient) {}

  getCartMenuItemOffer(menuItemOfferId: string): Observable<CartMenuItemOffer> {
    return this.http.get<CartMenuItemOffer>(
      `${this.baseUrl}/menuitemoffers/${menuItemOfferId}`
    );
  }

  addCartMenuItemOffer(payload: AddCartMenuItemOfferPayload): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/menuitemoffers`, payload);
  }

  removeCartMenuItemOffer(cartMenuItemOfferId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/menuitemoffers/${cartMenuItemOfferId}`
    );
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/`);
  }
}
