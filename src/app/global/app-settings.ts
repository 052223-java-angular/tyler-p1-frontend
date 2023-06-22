import { environment } from 'src/environments/environment.development';

export class AppSettings {
  private static USD: string = 'USD';

  public static P1_API_URL = environment.apiBaseUrl;
  public static DEFAULT_MENU_ID = 'menu-marstown';
  public static DEFAULT_MESSAGE_LIFE = 3000;
  public static CURRENCY_MAP = {
    [this.USD]: '$',
  };
}
