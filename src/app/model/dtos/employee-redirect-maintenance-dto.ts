export class EmployeeRedirectMaintenanceDto {
    constructor(
        public orderId: string,
        public oldEmployeeId: string,
        public newEmployeeId: string
    ) {}
}