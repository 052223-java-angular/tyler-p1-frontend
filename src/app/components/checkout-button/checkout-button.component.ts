import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { Cart } from 'src/app/models/cart';
import { Checkout } from 'src/app/models/checkout';
import { CartService } from 'src/app/services/cart.service';
import { NgEventBus } from 'ng-event-bus';
import { Subscription } from 'rxjs';
import { EventBusEvents } from 'src/app/global/event-bus-events';

@Component({
  selector: 'app-checkout-button',
  templateUrl: './checkout-button.component.html',
  styleUrls: ['./checkout-button.component.css'],
})
export class CheckoutButtonComponent implements OnInit {
  canShow: boolean = false;
  sub: Subscription;
  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private cartService: CartService,
    private eventBus: NgEventBus
  ) {
    this.sub = this.eventBus.on(`${EventBusEvents.CART}*`).subscribe((meta) => {
      this.getCartStatus();
    });
  }
  ngOnInit() {
    this.getCartStatus();
  }

  getCartStatus() {
    this.cartService.getCart().subscribe({
      next: (data: Cart) => {
        if (data) {
          if (data.cartMenuItemOfferResponses.length > 0) {
            this.canShow = true;
          } else {
            this.canShow = false;
          }
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

  checkout() {
    this.loading = true;
    this.cartService.checkout().subscribe({
      next: (data: Checkout) => {
        window.location.href = data.url;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
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
