export enum EmployeeOrderFilterType {
    TODAY = "TODAY",
    DATE_PERIOD = "DATE_PERIOD",
    ALL = "ALL"
}

export class EmployeeOrderPeriodFilter {
    constructor(
        public filterType: EmployeeOrderFilterType.DATE_PERIOD,
        public startDate: Date,
        public endDate: Date,
    ) { }
}

export class EmployeeOrderSimpleFilter {
    constructor(
        public filterType: EmployeeOrderFilterType.TODAY | EmployeeOrderFilterType.ALL,
    ) { }
}

export type EmployeeOrderFilter = EmployeeOrderPeriodFilter | EmployeeOrderSimpleFilter;