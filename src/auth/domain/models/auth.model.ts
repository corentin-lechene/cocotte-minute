import {AuthId} from "../value-object/auth-id.vo";
import {AuthCode} from "../value-object/auth-code.vo";

export class UserAuth {
    id: AuthId;
    code: AuthCode;
    expiredAt?: Date;

    constructor(id: AuthId, code: AuthCode, expiredAt?: Date) {
        this.id = id;
        this.code = code;
        this.expiredAt = expiredAt;
    }
}