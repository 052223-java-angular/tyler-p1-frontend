import { CartMenuItemOffer } from './cart-menu-item-offer';

export interface Cart {
  id: string;
  points: number;
  cartMenuItemOfferResponses: CartMenuItemOffer[];
}
