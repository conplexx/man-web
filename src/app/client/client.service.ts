import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ClientOrderDto } from '../model/dtos/client-order-dto';
import { EquipmentCategory } from '../model/data/equipment-category.model';
import { BaseResponse } from '../model/response/base-response';
import { Order } from '../model/data/order.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = 'http://localhost:8080/api/cliente';
  homeUrl = `${this.url}/home`;
  orderUrl = `${this.url}/pedido`;
  equipmentCategoriesUrl = `${this.url}/categorias-de-equipamento`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  getHome(): Observable<BaseResponse<Order[]>> {
    return this.http.get<BaseResponse<Order[]>>(this.homeUrl, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  postOrder(clientOrderDto: ClientOrderDto): Observable<BaseResponse<Order>> {
    return this.http.post<BaseResponse<Order>>(this.orderUrl, JSON.stringify(clientOrderDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getAllOrders(): Observable<BaseResponse<Order[]>> {
    return this.http.get<BaseResponse<Order[]>>(this.orderUrl, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getOrder(orderId: string): Observable<BaseResponse<Order>> {
    return this.http.get<BaseResponse<Order>>(`${this.orderUrl}/${orderId}`, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getEquipmentCategories(): Observable<BaseResponse<EquipmentCategory[]>> {
    return this.http.get<BaseResponse<EquipmentCategory[]>>(this.equipmentCategoriesUrl, this.httpOptions).pipe(retry(1), catchError(this.handleError));
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
