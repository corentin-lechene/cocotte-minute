import * as jwt from "jsonwebtoken";
import {TokenService} from "../../domain/services/token.service";
import {AuthId} from "../../domain/value-object/auth-id.vo";

export class JwtTokenService implements TokenService {
    constructor(private readonly secret: string) {}

    async generate(userId: AuthId): Promise<string> {
        return jwt.sign({ userId }, this.secret, { expiresIn: "1y" });
    }

    async verify(token: string): Promise<{ userId: AuthId }> {
        const payload = jwt.verify(token, this.secret);
        if(typeof payload !== 'string' && 'userId' in payload) {
            return { userId: AuthId.from(payload.userId) };
        }
        throw new Error('Invalid token payload');
    }
}