import { Component } from '@angular/core';
import { ClientOrderState } from '../../enum/client-order-state';
import { DataResponse } from '../../model/base-response.model';
import { Order } from '../../model/order.model';
import { ClientService } from '../client.service';
import { ClientHomeAction } from '../../enum/client-home-action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'client-home',
  standalone: true,
  imports: [CommonModule],
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

  getClientHomeAction(state: ClientOrderState): ClientHomeAction {
    switch(state){
      case ClientOrderState.BUDGETED:
        return ClientHomeAction.APPROVE_OR_REJECT;
      case ClientOrderState.APPROVED:
        return ClientHomeAction.NO_ACTION;
      case ClientOrderState.REJECTED:
        return ClientHomeAction.REDEEM_SERVICE;
      case ClientOrderState.FIXED:
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
}
