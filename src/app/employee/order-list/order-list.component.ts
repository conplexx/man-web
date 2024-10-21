import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeOrder } from '../../model/data/employee-order.model';
import { EmployeeOrderFilter, EmployeeOrderFilterType, EmployeeOrderSimpleFilter } from '../../model/data/employee-order-filter.model';
import { BaseResponse, BaseResponseType, DataResponse } from '../../model/response/base-response';
import { getOrderStateLabel, OrderState } from '../../model/enum/order-state';
import { EmployeeOrderListAction } from '../../model/enum/employee-order-list-action';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class EmployeeOrderListComponent {
    orders: EmployeeOrder[] = [];
    actions: (EmployeeOrderListAction | null)[] = [];
    filter: EmployeeOrderFilter = new EmployeeOrderSimpleFilter(EmployeeOrderFilterType.ALL);
    
    constructor(private employeeService: EmployeeService, private router: Router) {
        this.getOrders();
    }

    getOrders() {
        this.employeeService.getOrders(this.filter).subscribe((res: BaseResponse<EmployeeOrder[]>) => {
            if(res.type === BaseResponseType.DATA){
                const dataRes = res as DataResponse<EmployeeOrder[]>;
                this.orders = dataRes.data;
                this.actions = this.orders.map(order => this.getEmployeeHomeAction(order.state));
            }
        });
    }

    getOrderStateLabel(state: OrderState): string {
        return getOrderStateLabel(state);
    }

    getEmployeeHomeAction(state: OrderState): EmployeeOrderListAction | null {
        switch(state){
            case OrderState.OPEN:
                return EmployeeOrderListAction.BUDGET;
            case OrderState.APPROVED:
            case OrderState.REDIRECTED:
                return EmployeeOrderListAction.GO_TO_MAINTANANCE;
            case OrderState.PAYED:
                return EmployeeOrderListAction.FINALIZE;
            default:
                return null;
        }
    }
    
    getActionButtonLabel(action: EmployeeOrderListAction | null): string {
        switch(action) {
            case EmployeeOrderListAction.BUDGET:
                return "efetuar orçamento";
            case EmployeeOrderListAction.GO_TO_MAINTANANCE:
                return "realizar manutenção";
            case EmployeeOrderListAction.FINALIZE:
                return "finalizar solicitação";
            default:
                return '';
        }
    }

    getStateLabelColor(state: OrderState): string {
        switch(state) {
            case OrderState.OPEN:
                return 'gray';
            case OrderState.BUDGETED:
                return 'brown';
            case OrderState.REJECTED:
                return 'red';
            case OrderState.APPROVED:
                return 'yellow';
            case OrderState.REDIRECTED:
                return 'purple'; 
            case OrderState.FIXED:
                return 'azul'; 
            case OrderState.PAYED:
                return 'orange';
            case OrderState.FINALIZED:
                return 'green';
              default:
                return 'gray';
        }
    }

    performAction(orderId: string, action: EmployeeOrderListAction | null) {
        switch(action){
            case EmployeeOrderListAction.BUDGET:
                this.router.navigate(['/funcionario/analisar-pedido', orderId]);
                return;
        }
    }
}
