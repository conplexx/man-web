import { Component } from '@angular/core';
import { DataResponse } from '../../model/base-response.model';
import { Order } from '../../model/order.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  orders: Order[] = [];

  constructor(private clientService: ClientService) {
    this.clientService.getHome().subscribe(res => {
        if(res instanceof DataResponse) {
            // res.data;
        }
    });
  }
}
