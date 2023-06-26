import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutButtonComponent } from './checkout-button.component';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { NgEventBus } from 'ng-event-bus';

describe('CheckoutButtonComponent', () => {
  let component: CheckoutButtonComponent;
  let fixture: ComponentFixture<CheckoutButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutButtonComponent],
      imports: [HttpClientModule],
      providers: [MessageService, NgEventBus],
    });
    fixture = TestBed.createComponent(CheckoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
