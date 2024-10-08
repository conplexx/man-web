import { AddressDto } from "./address-dto";

export class UserLoginDto {
    constructor(
        public email: string,
        public password: string
    ) { }
} 