export class EventBusEvents {
  public static CART = 'cart:';
  public static ADD_MENU_ITEM_TO_CART = `${this.CART}add`;
  public static REMOVE_MENU_ITEM_TO_CART = `${this.CART}remove`;
  public static LOGIN = 'login:';
  public static LOGIN_LOGIN = `${this.LOGIN}login`;
}
