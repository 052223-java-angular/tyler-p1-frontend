import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AppSettings } from 'src/app/global/app-settings';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  loading: boolean = true;
  favorites: any = [];

  constructor(
    private messageService: MessageService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favoriteService
      .getFavorites()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (favorites) => {
          this.favorites = favorites;
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

  removeFavorite(id: string) {
    this.loading = true;
    this.favoriteService.removeFavorite(id).subscribe({
      next: () => {
        this.getFavorites();
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
}
