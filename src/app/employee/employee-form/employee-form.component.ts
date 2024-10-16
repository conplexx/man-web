import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNgxMask } from 'ngx-mask';
import { NgxMaskDirective } from 'ngx-mask/lib/ngx-mask.directive';
import { Employee } from '../../model/data/employee.model';
import { EmployeeService } from '../employee.service';
import { BaseResponse, BaseResponseType } from '../../model/response/base-response';

@Component({
  selector: 'app-employee-crud',
  standalone: true,
  imports: [NgxMaskDirective, ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  providers: [provideNgxMask()]
})
export class EmployeeCrudComponent {
    employee?: Employee;
    form: FormGroup;

    constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            cpf:        ['', Validators.required],
            name:       ['', Validators.required],
            email:      ['', [Validators.required, Validators.email]],
            phone:      ['', [Validators.required, Validators.minLength(11)]],
            birthday:   ['', [Validators.required]],
        });
    }

    patchEmployee(employee: Employee) {
        this.employeeService.patchEmployee(employee).subscribe((res: BaseResponse<Employee>) => {
            if(res.type !== BaseResponseType.ERROR){
                
            }
        });
    }
}