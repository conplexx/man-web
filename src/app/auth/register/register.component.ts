import { Component, OnInit } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgForm, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViaCepResponse } from '../../model/via-cep-response.model';
import { AddressDto } from '../../dtos/address-dto';
import { UserRegisterDto } from '../../dtos/user-register-dto';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgxMaskDirective, FormsModule, ReactiveFormsModule, CommonModule],
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
        const zip = this.userForm.get('zipCode');
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
        console.log("change", this.addressZipCode);
        this.authService.getCepInfo(this.getUnmaskedZipCode()).subscribe((data: ViaCepResponse) => {
            this.addressForm.patchValue({
                street: data.logradouro,
                neighborhood: data.bairro,
                state: data.uf,
                city: data.localidade,
            });
            console.log("setvalue", data);
        });
    }

    onSubmit() {
        if(!this.addressForm.valid || !this.userForm.valid){
            return;
        }
        const addressFields = this.addressForm.value;
        const addressDto = new AddressDto(
            addressFields.zipCode,
            addressFields.state,
            addressFields.city,
            addressFields.neighborhood,
            addressFields.street,
            addressFields.number,
            addressFields.complement
        );
        const userFields = this.userForm.value;
        const userDto = new UserRegisterDto(
            userFields.cpf,
            userFields.name,
            userFields.email,
            userFields.phone,
            addressDto
        );
        this.authService.register(userDto).subscribe((response: HttpResponse<any>) => {
            if(response.status === 201){
                this.router.navigate(['/auth/login']);
            }
            else {
                //TODO lidar
            }
        });
    }
}
