import { Component } from '@angular/core';
import { Employee } from '../../model/data/employee.model';
import { userKey } from '../../model/data/local-storage-keys';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'employee-app-parent-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './parent-layout.component.html',
  styleUrl: './parent-layout.component.css'
})
export class EmployeeParentLayoutComponent {
    employee?: Employee;

    constructor() {
        this.getEmployee();
    }

    getEmployee() {
        const user = localStorage.getItem(userKey);
        if (user) {
            this.employee = JSON.parse(user) as Employee;
        }
    }
}
