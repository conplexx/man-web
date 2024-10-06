import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    // standalone: true,
    // imports: [CommonModule, RouterOutlet, AuthComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    constructor(private router: Router) {}

    isHome(): boolean {
        return this.router.url === '/';
    }
}
