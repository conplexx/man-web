import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register';
import { LoginComponent } from './auth/login';

const routes: Routes = [
  {path:'', redirectTo:'auth/register', pathMatch:'full'},
  
  {path: 'auth/autocadastro', component: RegisterComponent},
  {path: 'auth/login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }