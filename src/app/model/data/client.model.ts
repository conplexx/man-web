import { HttpResponse } from "@angular/common/http";
import { UserRole } from "../enum/user-role";
import { Address } from "./address.model";

export class Client {
    constructor(
      public cpf: string,
      public name: string,
      public email: string,
      public phone: string,
      public role: UserRole,
      public address: Address,
      public id?: string,
    ) {}
}