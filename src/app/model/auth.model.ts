import { HttpResponse } from "@angular/common/http";
import { AccessToken } from "./access-token.model";
import { Client } from "./client.model";
import { UserRole } from "../enum/UserRole";
import { Employee } from "./employee.model";

export class Auth {
    constructor (
        public accessToken: AccessToken,
        public userRole: UserRole,
        public client?: Client,
        public employee?: Employee
    ) {}
}
