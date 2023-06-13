import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Route for the home page
  { path: 'about', component: AboutComponent }, // Route for the about page
  { path: 'register', component: RegisterComponent }, // Route for the register page
  { path: '**', component:NotFoundComponent } // Route for handling not-found pages
];

/**
 * Module for configuring and managing application routes.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
