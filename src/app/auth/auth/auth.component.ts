import { Component, OnInit } from '@angular/core';
import { AuthService, ViaCepResponse } from '../../services';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgForm, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgxMaskDirective, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [provideNgxMask()]
})

export class AuthComponent {
    userForm: FormGroup;
    addressForm: FormGroup;
    
    constructor(private authService: AuthService, private formBuilder: FormBuilder) {
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
        console.log(this.userForm.value);
      }
}
