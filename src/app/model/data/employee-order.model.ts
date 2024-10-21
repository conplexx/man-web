import { Client } from "./client.model";
import { EquipmentCategory } from "./equipment-category.model";
import { OrderStep } from "./order.model";
import { OrderState } from "../enum/order-state";

export class EmployeeOrder {
    constructor(
        public id: string,
        public client: Client,
        public date: Date,
        public equipmentCategory: EquipmentCategory,
        public equipmentDescription: string,
        public failureDescription: string,
        public state: OrderState,
        public steps: OrderStep[]
    ) {}
}
