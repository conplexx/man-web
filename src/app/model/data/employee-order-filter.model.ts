export enum EmployeeOrderFilterDateType {
    TODAY = "TODAY",
    DATE_PERIOD = "DATE_PERIOD",
    ALL = "ALL"
}

export class EmployeeOrderPeriodFilter {
    constructor(
        public dateType: EmployeeOrderFilterDateType.DATE_PERIOD,
        public startDate: Date,
        public endDate: Date,
    ) { }
}

export class EmployeeOrderSimpleFilter {
    constructor(
        public dateType: EmployeeOrderFilterDateType.TODAY | EmployeeOrderFilterDateType.ALL,
    ) { }
}

export type EmployeeOrderFilter = EmployeeOrderPeriodFilter | EmployeeOrderSimpleFilter;