import { Component, OnInit } from '@angular/core';
import { AuthService, ViaCepResponse } from '../services';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgForm, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
    form: FormGroup;
    
    constructor(private authService: AuthService, private formBuilder: FormBuilder) {
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
      console.log(this.form.value);
    }
}

