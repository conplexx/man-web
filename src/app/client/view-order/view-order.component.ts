import { Component } from '@angular/core';
import { ClientService } from '../client.service';
import { Order } from '../../model/data/order.model';
import { ActivatedRoute } from '@angular/router';
import { BaseResponse, BaseResponseType, DataResponse } from '../../model/response/base-response';
import { CommonModule } from '@angular/common';
import { OrderState } from '../../model/enum/order-state';

@Component({
  selector: 'view-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent {
  order?: Order;
  allOrderStates = OrderState;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {
    this.getOrder();
  }

  getOrder() {
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('orderId');
      if(orderId){
        console.log("a")
        this.clientService.getOrder(orderId).subscribe((res: BaseResponse<Order>) => {
          if(res.type === BaseResponseType.DATA){
              const dataRes = res as DataResponse<Order>;
              this.order = dataRes.data;

              console.log("b", dataRes.data)
          }
      });
      }
    });
  }
}
