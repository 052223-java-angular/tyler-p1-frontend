import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'src/app/models/menu-item';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menu!: Menu;

  constructor(
    private menuService: MenuService,
    private messageService: MessageService
  ) {
    this.menu = {
      id: '',
      name: '',
      disclaimer: '',
      menuSections: [],
    };
  }

  ngOnInit(): void {
    this.menuService.getById(AppSettings.DEFAULT_MENU_ID).subscribe({
      next: (value: Menu) => {
        this.menu = value;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
      },
    });
  }

  getCurrencySymbol(currencyCode: string): string {
    return AppSettings.CURRENCY_MAP[currencyCode];
  }

  // TODO
  getLowestOfferPrice(menuItem: MenuItem): number {
    return 0;
  }
}
