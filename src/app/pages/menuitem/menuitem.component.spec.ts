import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menuitem.component';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { NgEventBus } from 'ng-event-bus';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuItemComponent],
      imports: [HttpClientModule, ReactiveFormsModule, RouterModule],
      providers: [
        MessageService,
        NgEventBus,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    });
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
