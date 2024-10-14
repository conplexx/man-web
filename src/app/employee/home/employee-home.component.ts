import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { BaseResponse, DataResponse } from '../../model/response/base-response';
import { EmployeeOrder } from '../../model/data/employee-order.model';
import { EmployeeBudgetDto } from '../../model/dtos/employee-budget-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})

export class HomeComponent {
    orders: EmployeeOrder[] = [];

    constructor(private employeeService: EmployeeService) {
        this.employeeService.getHome().subscribe((res: BaseResponse<EmployeeOrder[]>) => {
            if(res instanceof DataResponse) {
                this.orders = res.data;
            }
        });
    }
}
