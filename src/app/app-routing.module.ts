import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuItemComponent } from './pages/menuitem/menuitem.component';
import { CartComponent } from './pages/cart/cart.component';
import { SuccessComponent } from './pages/checkout/success/success.component';
import { CancelComponent } from './pages/checkout/cancel/cancel.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderComponent } from './pages/orders/order/order.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FourOhFourComponent } from './pages/four-oh-four/four-oh-four.component';

const routes: Routes = [
  { path: '', component: MenuComponent }, // Route for the home page
  { path: 'signup', component: RegisterComponent }, // Route for the signup page
  { path: 'login', component: LoginComponent }, // Route for the login page
  { path: 'menu', component: MenuComponent },
  { path: 'menuItem', component: MenuItemComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  {
    path: 'checkout/success',
    component: SuccessComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'checkout/cancel', component: CancelComponent },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'orders/:id',
    component: OrderComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuardService],
  },
  { path: '404', component: FourOhFourComponent },
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
