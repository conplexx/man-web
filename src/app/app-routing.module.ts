import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register';
import { LoginComponent } from './auth/login';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './client/home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'auth/autocadastro', pathMatch:'full'},
  
  {path: 'auth/autocadastro', component: RegisterComponent},
  {path: 'auth/login', component: LoginComponent},

  {path: 'cliente/home', component: HomeComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }