import { MenuItem } from './menu-item';

export interface MenuSection {
  id: string;
  name: string;
  description: string;
  menuItems: MenuItem[];
  displayOrder: number;
  minimumQuantity: number;
  maximumQuantity: number;
}
