export enum OrderState {
    OPEN = "OPEN",
    BUDGETED = "BUDGETED",
    REJECTED = "REJECTED",
    APPROVED = "APPROVED",
    REDIRECTED = "REDIRECTED",
    FIXED = "FIXED",
    PAYED = "PAYED",
    FINALIZED = "FINALIZED"
}

export const getOrderStateLabel = (state: OrderState): string => {
    switch (state) {
        case OrderState.OPEN:
            return "aberta";
        case OrderState.BUDGETED:
            return "orçada";
        case OrderState.REJECTED:
            return "rejeitada";
        case OrderState.APPROVED:
            return "aprovada";
        case OrderState.REDIRECTED:
            return "redirecionada";
        case OrderState.FIXED:
            return "arrumada";
        case OrderState.PAYED:
            return "paga";
        case OrderState.FINALIZED:
            return "finalizada";
        default:
            return "";
    }
}