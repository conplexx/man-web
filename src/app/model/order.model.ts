import { HttpResponse } from "@angular/common/http";
import { ClientOrderState } from "../enum/ClientOrderState";
import { Budget } from "./budget.model";
import { BaseResponse, DataResponse } from "./base-response.model";

export class Order {
    constructor (
        id: string,
        date: Date,
        equipmentCategoryId: string,
        equipmentDescription: string,
        state: ClientOrderState,
        steps: OrderStep[]
    ) {}
}

export class OrderStep {
    constructor (
        id: string,
        orderId: string,
        state: ClientOrderState,
        date: Date,
        employeeId: string,
        maintananceId?: string,
        clientRejectedReason?: string,
        budget?: Budget
    ) {}
}