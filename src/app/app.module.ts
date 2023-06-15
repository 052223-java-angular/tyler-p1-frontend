import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './pages/login/login.component';
/**
 * The root module of the Angular application.
 */
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
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
  providers: [MessageService], // Array of services to be provided globally
  bootstrap: [AppComponent], // The root component to be bootstrapped
})
export class AppModule {}
