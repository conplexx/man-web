import { AccessToken } from "./access-token.model";
import { User } from "./user.model";

export class AuthResponse {
    constructor (
        accessToken: AccessToken,
        user: User
    ) {}
}