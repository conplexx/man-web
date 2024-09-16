import { Component } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
    private res: number = 0;
    
    constructor(private authService: AuthService) {}

    testarBotao(numero: number): void {
        this.res = this.authService.teste(numero);
    }

    get resultado(): string {
        return this.res.toString();
    }
}
