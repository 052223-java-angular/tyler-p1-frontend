import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { MenuItem } from 'src/app/models/menu-item';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';
import { NgEventBus } from 'ng-event-bus';
import { EventBusEvents } from 'src/app/global/event-bus-events';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.css'],
})
export class MenuItemComponent implements OnInit {
  menuItem!: MenuItem;
  user: any;

  constructor(
    private messageService: MessageService,
    private cartService: CartService,
    private tokenService: TokenService,
    private router: Router,
    private eventBus: NgEventBus
  ) {
    this.menuItem =
      this.router.getCurrentNavigation()?.extras.state?.['menuItem'];
  }

  ngOnInit(): void {
    // sort menu sections by display order
    this.menuItem.menuSections.sort((a, b) => a.displayOrder - b.displayOrder);
    for (let menuSection of this.menuItem.menuSections) {
      menuSection.menuItems.sort((a, b) => a.displayOrder - b.displayOrder);
    }
    this.user = this.tokenService.getUser();
  }

  addCartMenuItemOffer() {
    this.cartService
      .addCartMenuItemOffer({
        menuItemOfferId: this.menuItem.menuItemOffers[0].id,
        quantity: 1,
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.menuItem.name} added to Cart`,
            life: AppSettings.DEFAULT_MESSAGE_LIFE,
          });
          this.eventBus.cast(EventBusEvents.ADD_MENU_ITEM_TO_CART, '');
          this.router.navigate(['/']);
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
