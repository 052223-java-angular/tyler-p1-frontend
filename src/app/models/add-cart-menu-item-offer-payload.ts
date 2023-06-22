import { AddCartMenuItemOfferSectionPayload } from './add-cart-menu-item-offer-section-payload';

export interface AddCartMenuItemOfferPayload {
  menuItemOfferId: string;
  quantity: number;
  menuSections: AddCartMenuItemOfferSectionPayload[];
}
