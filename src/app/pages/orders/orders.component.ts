import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders = [];
  loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.loading = true;
    this.orderService
      .getOrders()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (orders) => {
          this.orders = orders;
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
