import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userKey } from '../../model/data/local-storage-keys';
import { Client } from '../../model/data/client.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'client-app-parent-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './parent-layout.component.html',
  styleUrl: './parent-layout.component.css'
})
export class ClientParentLayoutComponent {
    client?: Client;

    constructor() {
        this.getClient();
    }

    getClient() {
        const user = localStorage.getItem(userKey);
        if (user) {
            this.client = JSON.parse(user) as Client;
        }
    }
}
