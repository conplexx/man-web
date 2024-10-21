import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Employee } from '../../model/data/employee.model';
import { EmployeeService } from '../employee.service';
import { BaseResponse, BaseResponseType } from '../../model/response/base-response';
import { ActivatedRoute } from '@angular/router';
import { NewEmployeeDto } from '../../model/dtos/new-employee-dto';

@Component({
  selector: 'employee-form',
  standalone: true,
  imports: [NgxMaskDirective, ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  providers: [provideNgxMask()]
})
export class EmployeeFormComponent {
    employee?: Employee;
    form: FormGroup;
    creating: boolean = false;

    constructor(
        private employeeService: EmployeeService, 
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {
        this.form = this.formBuilder.group({
            cpf:        ['', Validators.required],
            name:       ['', Validators.required],
            email:      ['', [Validators.required, Validators.email]],
            phone:      ['', [Validators.required]],
            birthday:   [''],
        });
        
        this.route.paramMap.subscribe(params => {
            const employeeParam = params.get('employee');
            if (employeeParam) {
                this.employee = JSON.parse(employeeParam) as Employee;
                this.form.patchValue(this.employee);
            }
            // else {
            //     this.creating = true;
            //     this.form.addControl(
            //         'password', 
            //         this.formBuilder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
            //     );
            // }
        });
    }

    get employeeCpf() {
        return this.form.get('cpf');
    }
    getUnmaskedCpf(): string {
        const cpf = this.form.get('cpf');
        return cpf ? cpf.value.replace(/\D/g, '') : '';
    }
    get employeeName() {
        return this.form.get('name');
    }
    get employeeEmail() {
        return this.form.get('email');
    }
    get employeePhone() {
        return this.form.get('phone');
    }
    get employeeBirthday() {
        return this.form.get('birthday');
    }
    get employeePassword() {
        return this.form.get('password');
    }

    onSubmit() {
        const employeeDto = this.form.value as NewEmployeeDto;
        if(this.creating){
            this.createEmployee(employeeDto);
        }
        else if(this.employee) {
            const editedEmployee = this.form.value as Employee;
            editedEmployee.id = this.employee.id;
            this.patchEmployee(editedEmployee);
        }
    }

    patchEmployee(employee: Employee) {
        this.employeeService.patchEmployee(employee).subscribe((res: BaseResponse<Employee>) => {
            if(res.type === BaseResponseType.DATA){
                
            }
        });
    }

    createEmployee(employeeDto: NewEmployeeDto) {
        this.employeeService.postEmployee(employeeDto).subscribe((res: BaseResponse<Employee>) => {
            if(res.type === BaseResponseType.DATA){
                
            }
        });
    }
}