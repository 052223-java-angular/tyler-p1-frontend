import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { NgEventBus } from 'ng-event-bus';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { AppSettings } from 'src/app/global/app-settings';
import { CartMenuItemOffer } from 'src/app/models/cart-menu-item-offer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Cart;

  constructor(
    private messageService: MessageService,
    private cartService: CartService,
    private router: Router,
    private eventBus: NgEventBus
  ) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (cart: Cart) => {
        if (cart) {
          this.cart = cart;
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

  removeCartMenuItemOffer(cartMenuItemOffer: CartMenuItemOffer) {
    this.cartService.removeCartMenuItemOffer(cartMenuItemOffer.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Item removed from Cart`,
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
        this.eventBus.cast(EventBusEvents.REMOVE_MENU_ITEM_TO_CART, '');
        this.getCart();
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
