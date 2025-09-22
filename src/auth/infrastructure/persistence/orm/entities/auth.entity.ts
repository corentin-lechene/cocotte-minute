import {AuthId} from "../../../../domain/value-object/auth-id.vo";
import {AuthCode} from "../../../../domain/value-object/auth-code.vo";

export class AuthOrmEntity {
    id: AuthId['value'];
    code: AuthCode['value']
    expired_at?: Date;
    token?: string;

    constructor(id: AuthId['value'], code: AuthCode['value'], expiredAt?: Date, token?: string) {
        this.id = id;
        this.code = code;
        this.expired_at = expiredAt;
        this.token = token;
    }
}