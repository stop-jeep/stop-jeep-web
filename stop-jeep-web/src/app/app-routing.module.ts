import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {HomeResolver} from './home/home/home.resolver';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent,  resolve: { data: HomeResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
