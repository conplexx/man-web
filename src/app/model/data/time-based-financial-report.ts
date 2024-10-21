export class TimeBasedFinancialReport {
    constructor(
        public total: number,
        public startDate: Date,
        public endDate: Date,
        public revenue: DayRevenue[],
    ) { }
}

interface DayRevenue {
    day: Date,
    revenue: number[]
}