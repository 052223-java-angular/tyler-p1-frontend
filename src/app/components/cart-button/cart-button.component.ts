import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';
import { NgEventBus } from 'ng-event-bus';
import { Subscription } from 'rxjs';
import { EventBusEvents } from 'src/app/global/event-bus-events';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent implements OnInit, OnDestroy {
  quantity: number = 0;
  sub: Subscription;

  constructor(
    private messageService: MessageService,
    private cartService: CartService,
    private tokenService: TokenService,
    private eventBus: NgEventBus
  ) {
    this.sub = this.eventBus.on(`${EventBusEvents.CART}*`).subscribe((meta) => {
      console.log(meta.data);
      this.getQuantity();
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getUser().id) {
      this.getQuantity();
    }
  }

  getQuantity() {
    this.cartService.getCart().subscribe({
      next: (data: Cart) => {
        if (data) {
          this.quantity = data.cartMenuItemOfferResponses.reduce((acc, obj) => {
            return acc + obj.quantity;
          }, 0);
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
