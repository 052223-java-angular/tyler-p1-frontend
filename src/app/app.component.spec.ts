import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgEventBus } from 'ng-event-bus';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CheckoutButtonComponent } from './components/checkout-button/checkout-button.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from 'primeng/menu';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastModule, HttpClientModule, MenuModule],
      declarations: [AppComponent, NavbarComponent, CheckoutButtonComponent],
      providers: [NgEventBus, MessageService],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
