import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  teste(numero: number): number {
    return numero + 1;
  }

  getCepInfo(cep: string): Observable<ViaCepResponse> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<any>(url);
  }
}
