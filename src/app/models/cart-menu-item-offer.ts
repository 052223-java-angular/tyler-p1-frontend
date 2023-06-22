export interface CartMenuItemOffer {
  id: string;
  quantity: number;
  name: string;
  maxQuantity: number;
  minQuantity: number;
  currency: string;
  price: number;
  parentMenuSectionDisplayOrder: number;
  displayOrder: number;
  childCartMenuItemOffers: CartMenuItemOffer[];
}
