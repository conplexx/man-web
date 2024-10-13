export class EmployeeBudgetDto {
    constructor(
        public value: number,
        public orderStepId: string,
        public employeeId: string,
        public description?: string
    ) { }
} 