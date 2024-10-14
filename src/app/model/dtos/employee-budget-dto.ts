export class EmployeeBudgetDto {
    constructor(
        public value: number,
        public orderId: string,
        // public orderStepId: string,
        public description?: string
    ) { }
} 