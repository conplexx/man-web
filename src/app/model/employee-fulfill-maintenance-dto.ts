export class EmployeeFulfillMaintenanceDto {
    constructor(
        public orderId: string,
        public employeeId: string,
        public description: string,
        public orientation: string
    ) {}
}