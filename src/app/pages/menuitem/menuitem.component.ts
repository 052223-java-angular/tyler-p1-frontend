import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { MenuItem } from 'src/app/models/menu-item';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';
import { NgEventBus } from 'ng-event-bus';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.css'],
})
export class MenuItemComponent implements OnInit {
  menuItem!: MenuItem;
  user: any;
  menuItemIsOnFavoritesList: boolean = false;
  loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private cartService: CartService,
    private tokenService: TokenService,
    private favoritesService: FavoritesService,
    private router: Router,
    private eventBus: NgEventBus
  ) {
    this.menuItem = this.router.getCurrentNavigation()?.extras.state?.[
      'menuItem'
    ] || {
      id: '',
      name: '',
      description: '',
      menuItemOffers: [],
      menuSections: [],
      displayOrder: 1,
      imageUrl: '',
    };
  }

  ngOnInit(): void {
    // sort menu sections by display order
    if (this.menuItem) {
      this.menuItem.menuSections.sort(
        (a, b) => a.displayOrder - b.displayOrder
      );
      for (let menuSection of this.menuItem.menuSections) {
        menuSection.menuItems.sort((a, b) => a.displayOrder - b.displayOrder);
      }
    }

    this.user = this.tokenService.getUser();

    if (this.user.id) {
      Promise.all([
        this.favoritesService
          .getFavorite(this.menuItem.menuItemOffers[0].id)
          .subscribe({
            next: (data: any) => {
              if (data) {
                this.menuItemIsOnFavoritesList = true;
              }
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.error.message || error.statusText,
                life: AppSettings.DEFAULT_MESSAGE_LIFE,
              });
            },
          }),
      ]).then((/* values */) => {
        setTimeout(() => {
          this.loading = false;
        }, 150);
      });
    } else {
      this.loading = false;
    }
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

  removeFromFavorites() {
    this.favoritesService
      .removeFavorite(this.menuItem.menuItemOffers[0].id)
      .subscribe({
        next: () => {
          this.menuItemIsOnFavoritesList = false;
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

  addToFavorites() {
    this.favoritesService
      .addFavorite({
        menuItemOfferId: this.menuItem.menuItemOffers[0].id,
      })
      .subscribe({
        next: () => {
          this.menuItemIsOnFavoritesList = true;
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
