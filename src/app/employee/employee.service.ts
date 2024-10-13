import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { EmployeeBudgetDto } from '../dtos/employee-budget-dto';
import { BaseResponse } from '../model/base-response.model';
import { EmployeeFulfillMaintenanceDto } from '../model/employee-fulfill-maintenance-dto';
import { EmployeeOrdersResponse } from '../model/employee-order';
import { EmployeeOrderFilter } from '../model/employee-order-filter.model';
import { EmployeeRedirectMaintenanceDto } from '../model/employee-redirect-maintenance-dto';
import { Employee } from '../model/employee.model';
import { EquipmentCategory } from '../model/equipment-category.model';
import { NewEmployeeDto } from '../model/new-employee-dto.model';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'http://localhost:8080/api/funcionario';
  homeUrl = `${this.url}/home`;
  budgetUrl = `${this.url}/orcamento`;
  ordersUrl = `${this.url}/solicitacoes`;
  fulfillMaintenanceUrl = `${this.url}/efetuar-manutencao`;
  redirectMaintenanceUrl = `${this.url}/redirecionar-manutencao`;
  equipmentCategoriesUrl = `${this.url}/categorias-de-equipamento`;
  employeesUrl = `${this.url}/funcionarios`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  getHome(): Observable<EmployeeOrdersResponse> {
    return this.http.get<EmployeeOrdersResponse>(this.homeUrl, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  postBudget(employeeBudgetDto: EmployeeBudgetDto): Observable<BaseResponse<Order[]>> {
    return this.http.post<BaseResponse<Order[]>>(this.budgetUrl, JSON.stringify(employeeBudgetDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getOrders(orderFilter: EmployeeOrderFilter): Observable<BaseResponse<Order[]>> {
    return this.http.post<BaseResponse<Order[]>>(this.ordersUrl, JSON.stringify(orderFilter), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  fulfillMaintenance(fulfillDto: EmployeeFulfillMaintenanceDto): Observable<BaseResponse<Order>> {
    return this.http.post<BaseResponse<Order>>(this.fulfillMaintenanceUrl, JSON.stringify(fulfillDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  redirectMaintenance(redirectDto: EmployeeRedirectMaintenanceDto): Observable<BaseResponse<Order>> {
    return this.http.post<BaseResponse<Order>>(this.redirectMaintenanceUrl, JSON.stringify(redirectDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getEquipmentCategories(): Observable<BaseResponse<EquipmentCategory[]>> {
    return this.http.get<BaseResponse<EquipmentCategory[]>>(this.equipmentCategoriesUrl, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  postEquipmentCategory(equipmentCategoryName: string): Observable<BaseResponse<EquipmentCategory[]>> {
    return this.http.post<BaseResponse<EquipmentCategory[]>>(this.equipmentCategoriesUrl, equipmentCategoryName, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  patchEquipmentCategory(equipmentCategory: EquipmentCategory): Observable<BaseResponse<EquipmentCategory[]>> {
    return this.http.patch<BaseResponse<EquipmentCategory[]>>(`${this.equipmentCategoriesUrl}/${equipmentCategory.id}`, equipmentCategory, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  deleteEquipmentCategory(categoryId: string): Observable<BaseResponse<EquipmentCategory[]>> {
    return this.http.delete<BaseResponse<EquipmentCategory[]>>(`${this.equipmentCategoriesUrl}/${categoryId}`, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getEmployees(): Observable<BaseResponse<Employee[]>> {
    return this.http.get<BaseResponse<Employee[]>>(this.employeesUrl, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  postEmployee(employeeDto: NewEmployeeDto): Observable<BaseResponse<Employee>> {
    return this.http.post<BaseResponse<Employee>>(this.employeesUrl, JSON.stringify(employeeDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
