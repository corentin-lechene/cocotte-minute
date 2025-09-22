import {AuthOrmEntity} from "../entities/auth.entity";
import {UserAuth} from "../../../../domain/models/auth.model";
import {AuthId} from "../../../../domain/value-object/auth-id.vo";
import {AuthCode} from "../../../../domain/value-object/auth-code.vo";

export class AuthOrmMapper {
    static toDomain(entity: AuthOrmEntity): UserAuth {
        return new UserAuth(
            AuthId.from(entity.id),
            AuthCode.from(entity.code),
            entity.expired_at,
            entity.token,
        )
    }

    static toPersistence(userAuth: UserAuth): AuthOrmEntity {
        return new AuthOrmEntity(
            userAuth.id.getValue(),
            userAuth.code.getValue(),
            userAuth.expiredAt,
            userAuth.token,
        );
    }
}