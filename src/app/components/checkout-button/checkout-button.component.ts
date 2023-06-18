import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { Checkout } from 'src/app/models/checkout';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout-button',
  templateUrl: './checkout-button.component.html',
  styleUrls: ['./checkout-button.component.css'],
})
export class CheckoutButtonComponent {
  constructor(
    private messageService: MessageService,
    private cartService: CartService
  ) {}
  checkout() {
    this.cartService.checkout().subscribe({
      next: (data: Checkout) => {
        window.location.href = data.url;
      },
      error: (error) => {
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
