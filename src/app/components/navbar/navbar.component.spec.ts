import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { NgEventBus } from 'ng-event-bus';
import { MenuModule } from 'primeng/menu';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MenuModule, ButtonModule],
      providers: [
        NgEventBus,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
