import { MenuSection } from './menu-section';

export interface Menu {
  id: string;
  name: string;
  disclaimer: string;
  menuSections: MenuSection[];
}
