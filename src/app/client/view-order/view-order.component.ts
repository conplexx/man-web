import { Component } from '@angular/core';
import { ClientService } from '../client.service';
import { Order } from '../../model/order.model';
import { ActivatedRoute } from '@angular/router';
import { DataResponse } from '../../model/base-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'view-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent {
  order?: Order;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {
    this.getOrder();
  }

  getOrder() {
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('id');
      if(orderId){
        this.clientService.getOrder(orderId).subscribe(res => {
          if(res instanceof DataResponse){
              this.order = res.data;
          }
      });
      }
    });
  }
}
