import { HttpResponse } from "@angular/common/http";
import { UserRole } from "../enum/user-role";
import { Address } from "./address.model";

export class Employee {
    constructor(
        public id: string,
        public cpf: string,
        public name: string,
        public email: string,
        public role: UserRole,
        public birthday: Date
    ) {}
}
