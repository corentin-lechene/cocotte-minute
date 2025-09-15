import {UserAuth} from "../models/auth.model";
import {AuthCode} from "../value-object/auth-code.vo";

export abstract class AuthRepository {
    abstract findUserByCode(code: AuthCode): Promise<UserAuth>;
    abstract findUserByToken(token: string): Promise<UserAuth>;
    abstract saveUser(user: UserAuth): Promise<UserAuth>;
}