import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AddressDto } from '../../dtos/address-dto';
import { UserRegisterDto } from '../../dtos/user-register-dto';
import { BaseResponse, BaseResponseType, ErrorBaseResponse } from '../../model/base-response.model';
import { User } from '../../model/user.model';
import { ViaCepResponse } from '../../model/via-cep-response.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgxMaskDirective, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [provideNgxMask()]
})

export class RegisterComponent {
    userForm: FormGroup;
    addressForm: FormGroup;
    
    constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
        this.userForm = this.formBuilder.group({
            cpf:    ['', Validators.required],
            name:   ['', Validators.required],
            email:  ['', [Validators.required, Validators.email]],
            phone:  ['', [Validators.required, Validators.minLength(11)]],
        });

        this.addressForm = this.formBuilder.group({
            zipCode:            ['', Validators.required],
            street:             ['', Validators.required],
            number:             ['', Validators.required],
            complement:         [''],
            neighborhood:       ['', Validators.required],
            state:              ['', Validators.required],
            city:               ['', Validators.required],
        });
    }

    get userCpf() {
        return this.userForm.get('cpf');
    }
    getUnmaskedCpf(): string {
        const cpf = this.userForm.get('cpf');
        return cpf ? cpf.value.replace(/\D/g, '') : '';
    }
    get userName() {
        return this.userForm.get('name');
    }
    get userEmail() {
        return this.userForm.get('email');
    }
    get userPhone() {
        return this.userForm.get('phone');
    }
    get addressZipCode() {
        return this.addressForm.get('zipCode');
    }
    getUnmaskedZipCode(): string {
        const zip = this.addressForm.get('zipCode');
        return zip ? zip.value.replace(/\D/g, '') : '';
    }
    get addressStreet() {
        return this.addressForm.get('street');
    }
    get addressNumber() {
        return this.addressForm.get('number');
    }
    get addressComplement() {
        return this.addressForm.get('complement');
    }
    get addressNeighborhood() {
        return this.addressForm.get('neighborhood');
    }
    get addressState() {
        return this.addressForm.get('state');
    }
    get addressCity() {
        return this.addressForm.get('city');
    }

    onCepChange(): void {
        this.authService.getCepInfo(this.getUnmaskedZipCode()).subscribe((data?: ViaCepResponse) => {
            if(data){
                this.addressForm.patchValue({
                    state: data.uf,
                    city: data.localidade,
                    neighborhood: data.bairro,
                    street: data.logradouro,
                });
            }
        });
    }

    onSubmit() {
        if(!this.addressForm.valid || !this.userForm.valid){
            return;
        }
        const addressForm = this.addressForm.value;
        const addressDto = new AddressDto(
            addressForm.zipCode,
            addressForm.state,
            addressForm.city,
            addressForm.neighborhood,
            addressForm.street,
            addressForm.number,
            addressForm.complement
        );
        const userForm = this.userForm.value;
        const userDto = new UserRegisterDto(
            userForm.cpf,
            userForm.name,
            userForm.email,
            userForm.phone,
            addressDto
        );
        this.authService.register(userDto).subscribe((response: HttpResponse<BaseResponse<User>>) => {
            if(response.status === 201){
                this.router.navigate(['/auth/login']);
            }
            else {
                if(response?.body?.type === BaseResponseType.ERROR){
                    const errorResponse = response.body as ErrorBaseResponse;
                    console.log(errorResponse.errorMessage);
                }
            }
        });
    }
}
