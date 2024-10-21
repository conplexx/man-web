import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { BaseResponse, BaseResponseType, DataResponse } from '../../model/response/base-response';
import { EmployeeOrder } from '../../model/data/employee-order.model';
import { CommonModule } from '@angular/common';
import { getOrderStateLabel, OrderState } from '../../model/enum/order-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})

export class EmployeeHomeComponent {
    orders: EmployeeOrder[] = [];

    constructor(private employeeService: EmployeeService, private router: Router) {
        this.employeeService.getHome().subscribe((res: BaseResponse<EmployeeOrder[]>) => {
            if(res.type === BaseResponseType.DATA){
                const dataRes = res as DataResponse<EmployeeOrder[]>;
                this.orders = dataRes.data;
            }
        });
    }

    goToOrder(orderId: string) {
        this.router.navigate(['/funcionario/analisar-pedido', orderId]);
    }

    getOrderStateLabel(state: OrderState): string {
        return getOrderStateLabel(state);
    }
}
