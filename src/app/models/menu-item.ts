import { MenuItemOffer } from './menu-item-offer';
import { MenuSection } from './menu-section';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  menuItemOffers: MenuItemOffer[];
  menuSections: MenuSection[];
  displayOrder: number;
  imageUrl: string;
}
