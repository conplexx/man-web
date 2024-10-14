import { ClientOrderState } from "../enum/client-order-state";
import { Budget } from "./budget.model";
import { EquipmentCategory } from "./equipment-category.model";

export class Order {
    constructor (
        public id: string,
        public date: Date,
        public equipmentCategory: EquipmentCategory,
        public equipmentDescription: string,
        public state: ClientOrderState,
        public steps: OrderStep[]
    ) {}
}

//TODO criar tipos diferentes OrderStep
export class OrderStep {
    constructor (
        public id: string,
        public orderId: string,
        public state: ClientOrderState,
        public date: Date,
        public employeeId: string,
        public maintananceId?: string,
        public clientRejectedReason?: string,
        public budget?: Budget
    ) {}
}