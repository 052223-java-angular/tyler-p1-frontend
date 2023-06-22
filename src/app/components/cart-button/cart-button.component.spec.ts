import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartButtonComponent } from './cart-button.component';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { NgEventBus } from 'ng-event-bus';

describe('CartButtonComponent', () => {
  let component: CartButtonComponent;
  let fixture: ComponentFixture<CartButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartButtonComponent],
      imports: [HttpClientModule],
      providers: [MessageService, NgEventBus],
    });
    fixture = TestBed.createComponent(CartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
