import {AuthId} from "../value-object/auth-id.vo";
import {AuthCode} from "../value-object/auth-code.vo";

export class UserAuth {
    id: AuthId;
    code: AuthCode;
    expiredAt?: Date;
    token?: string;

    constructor(id: AuthId, code: AuthCode, expiredAt?: Date, token?: string) {
        this.id = id;
        this.code = code;
        this.expiredAt = expiredAt;
        this.token = token;
    }
}