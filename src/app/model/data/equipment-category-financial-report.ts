export class EquipmentCategoryFinancialReport {
    constructor(
        public total: number,
        public earnings: EquipmentCategoryRevenue[]
    ) { }
}

interface EquipmentCategoryRevenue {
    name: string,
    value: number
}