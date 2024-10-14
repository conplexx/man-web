import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './client/home/client-home.component';

const routes: Routes = [
  {path:'', redirectTo:'auth/login', pathMatch:'full'},
  
  {path: 'auth/cadastro', component: RegisterComponent},
  {path: 'auth/login', component: LoginComponent},

  {path: 'cliente/home', component: HomeComponent, canActivate: [authGuard]},

  {path: 'funcionario/home', component: HomeComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }