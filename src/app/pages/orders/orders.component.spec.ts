import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponent } from './orders.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      imports: [HttpClientModule, TableModule],
      providers: [MessageService],
    });
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
