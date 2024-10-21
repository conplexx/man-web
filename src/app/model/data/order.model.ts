import { OrderState } from "../enum/order-state";
import { Budget } from "./budget.model";
import { EquipmentCategory } from "./equipment-category.model";

export class Order {
    constructor (
        public id: string,
        public date: Date,
        public equipmentCategory: EquipmentCategory,
        public equipmentDescription: string,
        public failureDescription: string,
        public state: OrderState,
        public steps: OrderStep[]
    ) {}
}

//TODO criar tipos diferentes OrderStep
export class OrderStep {
    constructor (
        public id: string,
        public orderId: string,
        public state: OrderState,
        public date: Date,
        public employeeId: string,
        public maintananceId?: string,
        public clientRejectedReason?: string,
        public budget?: Budget
    ) {}
}