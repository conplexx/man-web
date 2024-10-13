import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDto } from '../../dtos/user-login-dto';
import { UserRole } from '../../enum/user-role';
import { Auth } from '../../model/auth.model';
import { BaseResponse, DataResponse, ErrorResponse } from '../../model/base-response.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
    form: FormGroup;
    
    constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
        this.form = this.formBuilder.group({
            email:  ['', [Validators.required, Validators.email]],
            password:  ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
        });
    }

    get email() {
        return this.form.get('email');
    }
    get password() {
      return this.form.get('password');
    }

    onSubmit() {
        const formInfo = this.form.value;
        const loginDto = {
            email: formInfo.email,
            password: formInfo.password
        } as UserLoginDto;

        this.authService.login(loginDto).subscribe((response: BaseResponse<Auth>) => {
            if(response instanceof DataResponse) {
                //TODO persistir
                if(response.data.userRole === UserRole.CLIENT) {
                    this.router.navigate(['cliente/home']);
                }
                if(response.data.userRole === UserRole.EMPLOYEE) {
                    this.router.navigate(['funcionario/home']);
                }
            }
            if(response instanceof ErrorResponse){
                console.log('login error');
            }
        });
    }

    navigateToRegister() {
        this.router.navigate(['auth/cadastro']);
    }
}

