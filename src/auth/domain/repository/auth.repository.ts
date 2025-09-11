import {UserAuth} from "../models/auth.model";
import {AuthCode} from "../value-object/auth-code.vo";

export abstract class AuthRepository {
    abstract findUserByCode(code: AuthCode): Promise<UserAuth>;
    abstract setUserCodeToExpired(userAuth: UserAuth): Promise<void>;
}