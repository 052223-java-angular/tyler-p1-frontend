import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent implements OnInit {
  quantity: number = 0;

  constructor(
    private messageService: MessageService,
    private cartService: CartService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getUser().id) {
      this.cartService.getCart().subscribe({
        next: (data: Cart) => {
          if (data) {
            this.quantity = data.cartMenuItemOfferResponses.reduce(
              (acc, obj) => {
                return acc + obj.quantity;
              },
              0
            );
          }
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
    }
  }
}
