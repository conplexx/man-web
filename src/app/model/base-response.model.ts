export enum BaseResponseType{
    EMPTY,
    ERROR,
    DATA
}

//sem dados e sem erro
export class EmptyBaseResponse {
    constructor(
        public type: BaseResponseType = BaseResponseType.EMPTY,
    ) {}
}

export class DataBaseResponse<T> {
    constructor(
        public type: BaseResponseType = BaseResponseType.DATA,
        public data: T
    ) {}
}

export class ErrorBaseResponse {
    constructor(
        public type: BaseResponseType = BaseResponseType.ERROR,
        public errorMessage: string
    ) {}
}

export type BaseResponse<T> = EmptyBaseResponse | DataBaseResponse<T> | ErrorBaseResponse;