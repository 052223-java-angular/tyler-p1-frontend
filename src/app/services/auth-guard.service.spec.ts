import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { NgEventBus } from 'ng-event-bus';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgEventBus],
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
