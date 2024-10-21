import { Component } from '@angular/core';
import { Employee } from '../../model/data/employee.model';
import { userKey } from '../../model/data/local-storage-keys';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { EmptyResponse } from '../../model/response/base-response';

@Component({
  selector: 'employee-app-parent-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './parent-layout.component.html',
  styleUrl: './parent-layout.component.css'
})
export class EmployeeParentLayoutComponent {
    employee?: Employee;

    constructor(private authService: AuthService, private router: Router) {
        this.getEmployee();
    }

    getEmployee() {
        const user = localStorage.getItem(userKey);
        if (user) {
            this.employee = JSON.parse(user) as Employee;
        }
    }

    logout() {
        this.authService.logout().subscribe((res: EmptyResponse) => {
            console.log('logout');
        });
        this.router.navigate(['auth/login']);
    }
}
