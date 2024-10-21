import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-fincancial-report',
  standalone: true,
  imports: [],
  templateUrl: './fincancial-report.component.html',
  styleUrl: './fincancial-report.component.css'
})
export class FincancialReportComponent {
    constructor(private employeeService: EmployeeService) {
        
    }
}
