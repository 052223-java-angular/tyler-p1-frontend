import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { NgEventBus } from 'ng-event-bus';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { AppSettings } from 'src/app/global/app-settings';
import { CartMenuItemOffer } from 'src/app/models/cart-menu-item-offer';
import { Router } from '@angular/router';
import { formatCurrency } from '@angular/common';
import { PointService } from 'src/app/point.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
  updateCart!: Cart;
  loading: boolean = true;
  points: number = 0;
  pointsSlider: number = 0;

  constructor(
    private messageService: MessageService,
    private cartService: CartService,
    private pointService: PointService,
    private router: Router,
    private eventBus: NgEventBus,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.cart = {
      id: '',
      points: 0,
      cartMenuItemOfferResponses: [],
    };
    this.updateCart = {
      id: '',
      points: 0,
      cartMenuItemOfferResponses: [],
    };
  }

  ngOnInit() {
    this.loading = true;
    Promise.all([this.getCart(), this.getPoints()]).then((/* values */) => {
      setTimeout(() => {
        this.loading = false;
      }, 150);
    });
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (cart: Cart) => {
        if (cart) {
          this.cart = cart;
          this.pointsSlider = cart.points;
          this.updateCart = JSON.parse(JSON.stringify(this.cart));
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

  getPoints() {
    this.pointService.getPoints().subscribe({
      next: (points) => {
        this.points = points;
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

  removeCartMenuItemOffer(cartMenuItemOffer: CartMenuItemOffer) {
    this.cartService.removeCartMenuItemOffer(cartMenuItemOffer.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Item removed from Cart`,
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
        this.eventBus.cast(EventBusEvents.REMOVE_MENU_ITEM_TO_CART, '');
        this.getCart();
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

  increaseQuantityByOne(item: CartMenuItemOffer) {
    if (item.quantity < item.maxQuantity) {
      item.quantity++;
    }
  }

  decreaseQuantityByOne(item: CartMenuItemOffer) {
    if (item.quantity - 1 >= item.minQuantity) {
      item.quantity--;
    }
  }

  updateQuantity(item: CartMenuItemOffer, index: number) {
    this.cartService
      .updateCartMenuItemOfferQuantity({
        cartMenuItemOfferId: item.id,
        quantity: item.quantity,
      })
      .subscribe({
        next: () => {
          this.cart.cartMenuItemOfferResponses[index].quantity =
            this.updateCart.cartMenuItemOfferResponses[index].quantity;
          this.cart.cartMenuItemOfferResponses[
            index
          ].childCartMenuItemOffers.forEach((childItem) => {
            childItem.quantity =
              this.updateCart.cartMenuItemOfferResponses[index].quantity;
          });
          this.eventBus.cast(EventBusEvents.UPDATE_MENU_ITEM_IN_CART, '');
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message || error.statusText,
            life: AppSettings.DEFAULT_MESSAGE_LIFE,
          });
        },
      });
  }

  showUpdateButton(index: number) {
    return (
      this.cart.cartMenuItemOfferResponses[index].quantity !=
      this.updateCart.cartMenuItemOfferResponses[index].quantity
    );
  }

  buildChildOptionValueString(item: CartMenuItemOffer) {
    let responses: String[] = [];
    item.childCartMenuItemOffers.sort(function (a, b) {
      return (
        a.parentMenuSectionDisplayOrder - b.parentMenuSectionDisplayOrder ||
        a.displayOrder - b.displayOrder
      );
    });
    for (const child of item.childCartMenuItemOffers) {
      responses = [
        ...responses,
        `${child.name}${
          child.price > 0
            ? ' (' +
              formatCurrency(
                child.price,
                this.locale,
                AppSettings.CURRENCY_MAP[child.currency]
              ) +
              ')'
            : ''
        }`,
      ];
    }
    return responses.join(', ');
  }

  calculateCartMenuItemOfferPrice(item: CartMenuItemOffer) {
    let price = item.price;
    for (let child of item.childCartMenuItemOffers) {
      price += child.price;
    }
    return formatCurrency(
      price,
      this.locale,
      AppSettings.CURRENCY_MAP[item.currency]
    );
  }

  calculateNumberOfItemsInCart() {
    return this.cart.cartMenuItemOfferResponses.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
  }

  calculateTotal() {
    return this.cart.cartMenuItemOfferResponses.reduce(
      (total, item) =>
        total +
        item.price * item.quantity +
        item.childCartMenuItemOffers.reduce(
          (subTotal, child) => subTotal + child.price * child.quantity,
          0
        ),
      0
    );
  }

  redeemPoints() {
    this.cartService.redeemPoints(this.pointsSlider).subscribe({
      next: (points) => {
        this.cart.points = points;
        this.updateCart.points = points;
        this.pointsSlider = points;
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

  cancelRedeemPoints() {
    this.cartService.removeRedeemPoints().subscribe({
      next: () => {
        this.cart.points = 0;
        this.updateCart.points = 0;
        this.pointsSlider = 0;
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

  calculateMaxPointsUserCanRedeem() {
    let value = Math.min(this.points, this.calculateTotal() * 100);
    console.log(value);
    return value;
  }
}
