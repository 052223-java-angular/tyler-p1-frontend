import { MenuItem } from './menu-item';

export interface MenuSection {
  name: string;
  description: string;
  menuItems: MenuItem[];
  displayOrder: number;
}
