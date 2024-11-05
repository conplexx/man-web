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
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EquipmentCategoriesComponent } from './employee/equipment-categories/equipment-categories.component';
import { EmployeeOrderListComponent } from './employee/order-list/order-list.component';
import { FincancialReportComponent } from './employee/fincancial-report/fincancial-report.component';

const routes: Routes = [
  {path:'', redirectTo:'auth/login', pathMatch:'full'},
  
  {path: 'auth/cadastro', component: RegisterComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/login/:email', component: LoginComponent},
  {
    path: 'cliente',
    component: ClientParentLayoutComponent,
    children: [
      {path: 'home', component: ClientHomeComponent, canActivate: [authGuard]},
      {path: 'novo-pedido', component: NewOrderComponent, canActivate: [authGuard]},
      {path: 'visualizar-pedido/:orderId', component: ViewOrderComponent, canActivate: [authGuard]},
    ]
  },
  {
    path: 'funcionario',
    component: EmployeeParentLayoutComponent,
    children: [
        {path: 'home', component: EmployeeHomeComponent, canActivate: [authGuard]},
        {path: 'funcionarios', component: EmployeeListComponent, canActivate: [authGuard]},
        {path: 'solicitacoes', component: EmployeeOrderListComponent, canActivate: [authGuard]},
        {path: 'form-funcionario', component: EmployeeFormComponent, canActivate: [authGuard]},
        {path: 'form-funcionario/:employee', component: EmployeeFormComponent, canActivate: [authGuard]},
        {path: 'categorias-de-equipamento', component: EquipmentCategoriesComponent, canActivate: [authGuard]},
        {path: 'analisar-pedido/:orderId', component: AnalyseOrderComponent, canActivate: [authGuard]},
        {path: 'relatorio-financeiro', component: FincancialReportComponent, canActivate: [authGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }