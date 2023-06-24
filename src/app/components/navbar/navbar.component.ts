import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { NgEventBus } from 'ng-event-bus';
import { Subscription } from 'rxjs';
import { EventBusEvents } from 'src/app/global/event-bus-events';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  sub: Subscription;

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

  updateLoggedInStatus(): void {
    if (this.tokenService.getUser().id) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
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
