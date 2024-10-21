import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDto } from '../../model/dtos/user-login-dto';
import { UserRole } from '../../model/enum/user-role';
import { Auth } from '../../model/data/auth.model';
import { BaseResponse, BaseResponseType, DataResponse, ErrorResponse } from '../../model/response/base-response';
import { AuthService } from '../auth.service';
import { authTokenKey, refreshTokenKey, userKey, userRoleKey } from '../../model/data/local-storage-keys';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
    form: FormGroup;
    gifSrc: string;

    private gifs: string[] = [
        'assets/1.gif',
        'assets/2.gif',
        'assets/3.gif',
        'assets/4.gif',
        'assets/5.gif',
        'assets/6.gif',
        'assets/7.gif',
        'assets/8.gif',
        'assets/9.gif',
        'assets/10.gif',
        'assets/11.gif',
        'assets/12.gif',
        'assets/13.gif',
        'assets/14.gif',
      ];
    
    
    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.form = this.formBuilder.group({
            email:  ['', [Validators.required, Validators.email]],
            password:  ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
        });
        this.gifSrc = this.gifs[Math.floor(Math.random() * this.gifs.length)];
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

        this.authService.login(loginDto).subscribe((res: BaseResponse<Auth>) => {
            if(res && res.type === BaseResponseType.DATA) {
                const dataRes = res as DataResponse<Auth>;
                localStorage.setItem(authTokenKey, dataRes.data.accessToken.authToken);
                localStorage.setItem(refreshTokenKey, dataRes.data.accessToken.refreshToken);
                localStorage.setItem(userRoleKey, dataRes.data.userRole);
                const user = dataRes.data.userRole === UserRole.CLIENT ? dataRes.data.client : dataRes.data.employee;
                localStorage.setItem(userKey, JSON.stringify(user));

                if(dataRes.data.userRole === UserRole.CLIENT) {
                    this.router.navigate(['cliente/home']);
                }
                if(dataRes.data.userRole === UserRole.EMPLOYEE) {
                    this.router.navigate(['funcionario/home']);
                }
            }
        });
    }
}

