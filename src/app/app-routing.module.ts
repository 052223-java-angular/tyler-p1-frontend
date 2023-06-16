import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuItemComponent } from './pages/menuitem/menuitem.component';

const routes: Routes = [
  { path: '', component: MenuComponent }, // Route for the home page
  { path: 'about', component: AboutComponent }, // Route for the about page
  { path: 'signup', component: RegisterComponent }, // Route for the signup page
  { path: 'login', component: LoginComponent }, // Route for the login page
  { path: 'menu', component: MenuComponent },
  { path: 'menuItem', component: MenuItemComponent },
  { path: '**', component: NotFoundComponent }, // Route for handling not-found pages
];

/**
 * Module for configuring and managing application routes.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
