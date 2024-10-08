import { Component } from '@angular/core';
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
    this.clientService.getHome().subscribe(orders => {
      this.orders = orders;
    });
  }
}
