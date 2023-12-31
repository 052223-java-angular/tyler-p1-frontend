import { Component, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { OrderService } from 'src/app/order.service';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  order: any;
  constructor(
    private messageService: MessageService,
    private orderService: OrderService,
    private eventBus: NgEventBus
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getLatest();
    }, 1000);
  }

  getLatest() {
    this.orderService.getLatest().subscribe({
      next: (order) => {
        this.order = order;
        this.eventBus.cast(EventBusEvents.REMOVE_MENU_ITEM_TO_CART, '');
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
