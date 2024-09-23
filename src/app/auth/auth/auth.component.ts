import { Component } from '@angular/core';
import { AuthService, ViaCepResponse } from '../../services';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgxMaskDirective],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [provideNgxMask()]
})
export class AuthComponent {
    cep: string = '';
    logradouro: string = '';
    complemento: string = '';
    unidade: string = '';
    bairro: string = '';
    localidade: string = '';
    uf: string = '';
    estado: string = '';
    
    constructor(private authService: AuthService) {}

    onCepChange(): void {
        if (this.cep) {
          this.authService.getCepInfo(this.cep).subscribe((data: ViaCepResponse) => {
            this.logradouro = data.logradouro;
            this.complemento = data.complemento;
            this.bairro = data.bairro;
            this.localidade = data.localidade;
            this.uf = data.uf;
            this.estado = data.estado;
          });
        }
      }

    get resultado(): string {
        return "a";
    }

}
