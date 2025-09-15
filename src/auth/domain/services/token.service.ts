import {AuthId} from "../value-object/auth-id.vo";

export abstract class TokenService {
    abstract generate(userId: AuthId): Promise<string>
    abstract verify(token: string): Promise<{ userId: AuthId }>
}