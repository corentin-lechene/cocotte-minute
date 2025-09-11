import {AuthId} from "../../../../domain/value-object/auth-id.vo";
import {AuthCode} from "../../../../domain/value-object/auth-code.vo";

export class AuthEntity {
    id: AuthId['value'];
    code: AuthCode['value']
    expiredAt?: Date;

    constructor(id: AuthId['value'], code: AuthCode['value'], expiresAt?: Date) {
        this.id = id;
        this.code = code;
        this.expiredAt = expiresAt;
    }
}