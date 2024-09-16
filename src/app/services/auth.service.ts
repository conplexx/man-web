import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  teste(numero: number): number {
    return numero + 1;
  }
}
