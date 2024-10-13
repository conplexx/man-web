import { HttpResponse } from "@angular/common/http";
import { Order } from "./order.model";
import { User } from "./client.model";

export class EmployeeOrder {
    constructor(
        public order: Order,
        public client: User
    ) {}
}

export type EmployeeOrderResponse = HttpResponse<EmployeeOrder>;
export type EmployeeOrdersResponse = HttpResponse<EmployeeOrder[]>;