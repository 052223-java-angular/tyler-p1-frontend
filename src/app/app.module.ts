import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { MenuItemComponent } from './pages/menuitem/menuitem.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { NgEventBus } from 'ng-event-bus';

/**
 * The root module of the Angular application.
 */
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    MenuItemComponent,
    CartButtonComponent,
  ],
  imports: [
    BrowserModule, // Required module for running the application in a browser environment
    BrowserAnimationsModule, // Required module for browser animations
    AppRoutingModule, // Module that configures and manages application routes
    ReactiveFormsModule, // Module for working with reactive forms
    HttpClientModule, // Module for making HTTP requests
    MessagesModule, // Module to display messages inline
    ToastModule, // Module to display messages in an overlay
  ],
  providers: [MessageService, authInterceptorProviders, NgEventBus], // Array of services to be provided globally
  bootstrap: [AppComponent], // The root component to be bootstrapped
})
export class AppModule {}
