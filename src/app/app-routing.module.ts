import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'main', component: MainComponent, children:[
    {path: 'home', component: HomeComponent}]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo:"login" , pathMatch:"prefix"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
