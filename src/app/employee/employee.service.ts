import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { EmployeeBudgetDto } from '../model/dtos/employee-budget-dto';
import { BaseResponse } from '../model/response/base-response';
import { EmployeeFulfillMaintenanceDto } from '../model/dtos/employee-fulfill-maintenance-dto';
import { EmployeeOrderFilter } from '../model/data/employee-order-filter.model';
import { EmployeeRedirectMaintenanceDto } from '../model/dtos/employee-redirect-maintenance-dto';
import { Employee } from '../model/data/employee.model';
import { EquipmentCategory } from '../model/data/equipment-category.model';
import { NewEmployeeDto } from '../model/dtos/new-employee-dto';
import { Order } from '../model/data/order.model';
import { EmployeeOrder } from '../model/data/employee-order.model';

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

  getHome(): Observable<BaseResponse<EmployeeOrder[]>> {
    return this.http.get<BaseResponse<EmployeeOrder[]>>(this.homeUrl, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  postBudget(employeeBudgetDto: EmployeeBudgetDto): Observable<BaseResponse<EmployeeOrder[]>> {
    return this.http.post<BaseResponse<EmployeeOrder[]>>(this.budgetUrl, JSON.stringify(employeeBudgetDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getOrders(orderFilter: EmployeeOrderFilter): Observable<BaseResponse<EmployeeOrder[]>> {
    return this.http.post<BaseResponse<EmployeeOrder[]>>(this.ordersUrl, JSON.stringify(orderFilter), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  fulfillMaintenance(fulfillDto: EmployeeFulfillMaintenanceDto): Observable<BaseResponse<EmployeeOrder>> {
    return this.http.post<BaseResponse<EmployeeOrder>>(this.fulfillMaintenanceUrl, JSON.stringify(fulfillDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  redirectMaintenance(redirectDto: EmployeeRedirectMaintenanceDto): Observable<BaseResponse<EmployeeOrder>> {
    return this.http.post<BaseResponse<EmployeeOrder>>(this.redirectMaintenanceUrl, JSON.stringify(redirectDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
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

  getAllEmployees(): Observable<BaseResponse<Employee[]>> {
    return this.http.get<BaseResponse<Employee[]>>(this.employeesUrl, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  postEmployee(employeeDto: NewEmployeeDto): Observable<BaseResponse<Employee>> {
    return this.http.post<BaseResponse<Employee>>(this.employeesUrl, JSON.stringify(employeeDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  patchEmployee(employee: Employee): Observable<BaseResponse<Employee>> {
    return this.http.patch<BaseResponse<Employee>>(`${this.employeesUrl}/${employee.id}`, JSON.stringify(employee), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  deleteEmployee(employeeId: string): Observable<BaseResponse<Employee[]>> {
    return this.http.delete<BaseResponse<Employee[]>>(`${this.employeesUrl}/${employeeId}`, this.httpOptions).pipe(retry(1), catchError(this.handleError));
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
