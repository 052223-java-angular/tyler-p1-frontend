import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  order: any;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getById(orderId).subscribe({
        next: (order) => {
          this.order = order;
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

  calculateLineItemPrice(item: any) {
    return (
      item.price +
      item.childOrderMenuItemOfferResponses.reduce(
        (total: number, child: any) => total + child.price,
        0
      )
    );
  }
  calculateLineItemTotal(item: any) {
    return this.calculateLineItemPrice(item) * item.quantity;
  }

  calculateGrandTotal() {
    return this.order
      ? this.order.orderMenuItemOfferResponses.reduce(
          (total: number, item: any) =>
            total + this.calculateLineItemTotal(item),
          0
        )
      : 0;
  }
}
