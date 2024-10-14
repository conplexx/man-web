export enum BaseResponseType{
    EMPTY = "EMPTY",
    ERROR = "ERROR",
    DATA = "DATA"
}

//sem dados e sem erro
export class EmptyResponse {
    constructor(
        public type: BaseResponseType = BaseResponseType.EMPTY,
    ) {}
}

export class DataResponse<T> {
    constructor(
        public type: BaseResponseType = BaseResponseType.DATA,
        public data: T
    ) {}
}

export class ErrorResponse {
    constructor(
        public type: BaseResponseType = BaseResponseType.ERROR,
        public errorMessage: string
    ) {}
}

export type BaseResponse<T> = EmptyResponse | DataResponse<T> | ErrorResponse;