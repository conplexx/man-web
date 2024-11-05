import { Component } from '@angular/core';
import { OrderState, getOrderStateLabel } from '../../model/enum/order-state';
import { BaseResponse, BaseResponseType, DataResponse } from '../../model/response/base-response';
import { Order } from '../../model/data/order.model';
import { ClientService } from '../client.service';
import { ClientHomeAction } from '../../model/enum/client-home-action';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'client-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.css'
})

export class ClientHomeComponent {
  orders: Order[] = [];
  actions: ClientHomeAction[] = [];
  allClientActions = ClientHomeAction;

  constructor(private clientService: ClientService, private router: Router) {
    this.clientService.getHome().subscribe((res: BaseResponse<Order[]>) => {
        if(res.type === BaseResponseType.DATA) {
          const dataRes = res as DataResponse<Order[]>;
          this.orders = dataRes.data;
          this.actions = this.orders.map(order => this.getClientHomeAction(order.state));
        }
    });
  }

  getClientHomeAction(state: OrderState): ClientHomeAction {
    switch(state){
      case OrderState.BUDGETED:
        return ClientHomeAction.APPROVE_OR_REJECT;
      case OrderState.APPROVED:
        return ClientHomeAction.NO_ACTION;
      case OrderState.REJECTED:
        return ClientHomeAction.REDEEM_SERVICE;
      case OrderState.FIXED:
        return ClientHomeAction.PAY_SERVICE;
      default:
        return ClientHomeAction.VIEW_ORDER;
    }
  }

  getActionButtonLabel(action: ClientHomeAction): string {
    switch(action) {
      case ClientHomeAction.APPROVE_OR_REJECT:
        return "aprovar/rejeitar serviço";
      case ClientHomeAction.REDEEM_SERVICE:
        return "resgatar serviço";
      case ClientHomeAction.PAY_SERVICE:
        return "pagar serviço";
      case ClientHomeAction.VIEW_ORDER:
        return "visualizar serviço";
      case ClientHomeAction.NO_ACTION:
        return '';
    }
  }

  performAction(orderId: string, action: ClientHomeAction) {
    switch(action){
      case ClientHomeAction.APPROVE_OR_REJECT:
        break;
      case ClientHomeAction.VIEW_ORDER:
        this.router.navigate(['/cliente/visualizar-pedido', orderId]);
        break;
      case ClientHomeAction.REDEEM_SERVICE:
        break;
      case ClientHomeAction.PAY_SERVICE:
        break;
    }
  }

  getOrderStateLabel(state: OrderState): string {
    return getOrderStateLabel(state);
  }
}
