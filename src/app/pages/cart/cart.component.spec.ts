import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { NgEventBus } from 'ng-event-bus';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [HttpClientModule, ProgressSpinnerModule],
      providers: [MessageService, NgEventBus],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
