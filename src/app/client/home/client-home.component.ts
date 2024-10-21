import { Component } from '@angular/core';
import { OrderState, getOrderStateLabel } from '../../model/enum/order-state';
import { BaseResponse, BaseResponseType, DataResponse } from '../../model/response/base-response';
import { Order } from '../../model/data/order.model';
import { ClientService } from '../client.service';
import { ClientHomeAction } from '../../model/enum/client-home-action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'client-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.css'
})

export class ClientHomeComponent {
  orders: Order[] = [];
  actions: ClientHomeAction[] = [];

  constructor(private clientService: ClientService) {
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
      case ClientHomeAction.VIEW_ORDER:
        //TODO ir pra pagina
        break;
      case ClientHomeAction.REDEEM_SERVICE:
        //TODO redeem
      case ClientHomeAction.PAY_SERVICE:
        //TODO pay
    }
  }

  getOrderStateLabel(state: OrderState): string {
    return getOrderStateLabel(state);
  }
}
