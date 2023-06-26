import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from './token.service';
import { NgEventBus } from 'ng-event-bus';
import { EventBusEvents } from '../global/event-bus-events';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private eventBus: NgEventBus
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: any | null = this.tokenService.getUser();

    if (!user.id) {
      this.tokenService.signOut();
      this.eventBus.cast(EventBusEvents.LOGIN_LOGOUT, '');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
