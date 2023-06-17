import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import { CartMenuItemOffer } from 'src/app/models/cart-menu-item-offer';
import { MenuItem } from 'src/app/models/menu-item';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.css'],
})
export class MenuItemComponent implements OnInit {
  menuItem!: MenuItem;
  cartMenuItemOffer!: CartMenuItemOffer;
  componentLoaded = false;
  user: any;

  constructor(
    private messageService: MessageService,
    private cartService: CartService,
    private tokenService: TokenService,
    private router: Router
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

    if (this.user.id) {
      this.cartService
        .getCartMenuItemOffer(this.menuItem.menuItemOffers[0].id)
        .pipe(
          finalize(() => {
            this.componentLoaded = true;
          })
        )
        .subscribe({
          next: (data) => {
            if (data) {
              this.cartMenuItemOffer = data;
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
      this.componentLoaded = true;
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
            detail: `${this.menuItem.name} successfully added to cart`,
            life: AppSettings.DEFAULT_MESSAGE_LIFE,
          });
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

  removeCartMenuItemOffer() {
    this.cartService
      .removeCartMenuItemOffer(this.cartMenuItemOffer.id)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.menuItem.name} successfully removed from cart`,
            life: AppSettings.DEFAULT_MESSAGE_LIFE,
          });
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
