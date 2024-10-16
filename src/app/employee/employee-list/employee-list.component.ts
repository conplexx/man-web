import { Component } from '@angular/core';
import { Employee } from '../../model/data/employee.model';
import { EmployeeService } from '../employee.service';
import { BaseResponse, BaseResponseType, DataResponse } from '../../model/response/base-response';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
    employees: Employee[] = [];

    constructor(private employeeService: EmployeeService) {
        this.getAllEmployees();
    }

    getAllEmployees() {
        this.employeeService.getAllEmployees().subscribe((res: BaseResponse<Employee[]>) => {
            if(res.type === BaseResponseType.DATA){
                const dataRes = res as DataResponse<Employee[]>;
                this.employees = dataRes.data;
            }
        });
    }

    deleteEmployee(employeeId: string) {
        this.employeeService.deleteEmployee(employeeId).subscribe((res: BaseResponse<Employee>) => {
            if(res.type !== BaseResponseType.ERROR){
                this.getAllEmployees();
            }
        });
    }

}
