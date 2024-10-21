import { Component } from '@angular/core';
import { EmployeeOrder } from '../../model/data/employee-order.model';
import { Client } from '../../model/data/client.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeBudgetDto } from '../../model/dtos/employee-budget-dto';
import { BaseResponse, BaseResponseType, DataResponse } from '../../model/response/base-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analyse-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analyse-order.component.html',
  styleUrl: './analyse-order.component.css'
})
export class AnalyseOrderComponent {
    order?: EmployeeOrder;

    constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {
        this.getOrder();
    }

    getOrder() {
        this.route.paramMap.subscribe(params => {
            const orderId = params.get('orderId');
            if (orderId) {
                this.employeeService.getOrder(orderId).subscribe((res: BaseResponse<EmployeeOrder>) => {
                    if(res.type === BaseResponseType.DATA){
                        const dataRes = res as DataResponse<EmployeeOrder>;
                        this.order = dataRes.data;
                    }
                });
            }
        });
    }

    produceBudget(budgetDto: EmployeeBudgetDto) {
        // this.employeeService.postBudget(budgetDto).subscribe((res: BaseResponse<EmployeeOrder>) => {
        //     if(res.type === BaseResponseType.DATA){
        //         const dataRes = res as DataResponse<EmployeeOrder>;
        //         this.order = dataRes.data;
        //     }
        // });
    }

}
