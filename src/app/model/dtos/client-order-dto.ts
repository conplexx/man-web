import { EquipmentCategory } from "../data/equipment-category.model";

export class ClientOrderDto {
    constructor(
        public equipmentDescription: string,
        public failureDescription: string,
        public equipmentCategoryId: string,
    ){}
}