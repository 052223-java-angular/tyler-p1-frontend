export class AppSettings {
  private static USD: string = 'USD';

  public static P1_API_URL = 'http://localhost:8080/p1/api';
  public static DEFAULT_MENU_ID = 'menu-marstown';
  public static DEFAULT_MESSAGE_LIFE = 3000;
  public static CURRENCY_MAP = {
    [this.USD]: '$',
  };
}
