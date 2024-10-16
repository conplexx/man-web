import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { ClientHomeComponent } from './client/home/client-home.component';
import { NewOrderComponent } from './client/new-order/new-order.component';
import { EmployeeHomeComponent } from './employee/home/employee-home.component';
import { AnalyseOrderComponent } from './employee/analyse-order/analyse-order.component';
import { ViewOrderComponent } from './client/view-order/view-order.component';
import { ClientParentLayoutComponent } from './client/parent-layout/parent-layout.component';
import { EmployeeParentLayoutComponent } from './employee/parent-layout/parent-layout.component';

const routes: Routes = [
  {path:'', redirectTo:'auth/login', pathMatch:'full'},
  
  {path: 'auth/cadastro', component: RegisterComponent},
  {path: 'auth/login', component: LoginComponent},
  {
    path: 'cliente',
    component: ClientParentLayoutComponent,
    children: [
      {path: 'home', component: ClientHomeComponent, canActivate: [authGuard]},
      {path: 'novo-pedido', component: NewOrderComponent, canActivate: [authGuard]},
      {path: 'visualizar-pedido', component: ViewOrderComponent, canActivate: [authGuard]},
      
    ]
  },
  {
    path: 'funcionario',
    component: EmployeeParentLayoutComponent,
    children: [
        {path: 'home', component: EmployeeHomeComponent, canActivate: [authGuard]},
        {path: 'analisar-pedido', component: AnalyseOrderComponent, canActivate: [authGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }