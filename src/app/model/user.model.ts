import { UserRole } from "../enum/UserRole";
import { Address } from "./address.model";

export class User {
    constructor(
        public cpf?: string,
        public name?: string,
        public email?: string,
        public phone?: string,
        public role?: UserRole,
        public address?: Address //TODO mudar para endereço completo
    ) { }
}