import { MenuItemOffer } from './menu-item-offer';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  menuItemOffers: MenuItemOffer[];
}
