import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { Cart } from 'src/app/models/cart';
import { Checkout } from 'src/app/models/checkout';
import { CartService } from 'src/app/services/cart.service';
import { NgEventBus } from 'ng-event-bus';
import { Subscription } from 'rxjs';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-checkout-button',
  templateUrl: './checkout-button.component.html',
  styleUrls: ['./checkout-button.component.css'],
})
export class CheckoutButtonComponent implements OnInit {
  canShow: boolean = false;
  sub: Subscription;
  loginSub: Subscription;
  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private cartService: CartService,
    private tokenService: TokenService,
    private eventBus: NgEventBus
  ) {
    this.sub = this.eventBus.on(`${EventBusEvents.CART}*`).subscribe((meta) => {
      this.getCartStatus();
    });

    this.loginSub = this.eventBus
      .on(`${EventBusEvents.LOGIN}*`)
      .subscribe((meta) => {
        this.getCartStatus();
      });
  }
  ngOnInit() {
    this.getCartStatus();
  }

  getCartStatus() {
    if (this.tokenService.getUser().id) {
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
    } else {
      this.canShow = false;
    }
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
