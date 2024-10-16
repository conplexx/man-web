import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userKey } from '../../model/data/local-storage-keys';
import { Client } from '../../model/data/client.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { EmptyResponse } from '../../model/response/base-response';

@Component({
  selector: 'client-app-parent-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './parent-layout.component.html',
  styleUrl: './parent-layout.component.css'
})
export class ClientParentLayoutComponent {
    client?: Client;

    constructor(private authService: AuthService, private router: Router) {
        this.getClient();
    }

    getClient() {
        const user = localStorage.getItem(userKey);
        if (user) {
            this.client = JSON.parse(user) as Client;
        }
    }

    logout() {
        this.authService.logout().subscribe((res: EmptyResponse) => {
            console.log('logout');
        });
        this.router.navigate(['auth/login']);
    }
}
