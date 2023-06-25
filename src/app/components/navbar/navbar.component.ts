import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { NgEventBus } from 'ng-event-bus';
import { Subscription } from 'rxjs';
import { EventBusEvents } from 'src/app/global/event-bus-events';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  sub: Subscription;
  items: MenuItem[] | undefined;
  user: any;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private eventBus: NgEventBus
  ) {
    this.sub = this.eventBus
      .on(`${EventBusEvents.LOGIN}*`)
      .subscribe((meta) => {
        this.updateLoggedInStatus();
      });
  }

  ngOnInit(): void {
    this.updateLoggedInStatus();
  }

  getItems() {
    return [
      {
        label: '',
        items: [
          {
            label: 'Food Menu',
            icon: 'pi pi-home',
            routerLink: ['/'],
          },
          ...(this.isLoggedIn
            ? [
                {
                  label: 'Orders',
                  icon: 'pi pi-list',
                  routerLink: ['/orders'],
                },
              ]
            : []),
          {
            label: 'Sign up',
            icon: 'pi pi-user-plus',
            routerLink: ['/signup'],
          },
          this.isLoggedIn
            ? {
                label: 'Logout',
                icon: 'pi pi-power-off',
                command: () => this.logout(),
              }
            : {
                label: 'Login',
                icon: 'pi pi-lock-open',
                routerLink: ['/login'],
              },
        ],
      },
    ];
  }

  updateLoggedInStatus(): void {
    if (this.tokenService.getUser().id) {
      this.user = this.tokenService.getUser();
      this.isLoggedIn = true;
      this.items = this.getItems();
    } else {
      this.isLoggedIn = false;
      this.user = {};
      this.items = this.getItems();
    }
  }

  logout() {
    this.tokenService.signOut();
    this.isLoggedIn = false;
    this.eventBus.cast(EventBusEvents.LOGIN_LOGOUT, '');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
