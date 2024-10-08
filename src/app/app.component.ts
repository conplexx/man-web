import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './auth/register';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    // standalone: true,
    // imports: [CommonModule, RouterOutlet, RegisterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    constructor() {}
}
