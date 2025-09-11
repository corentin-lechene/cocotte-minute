import {AuthEntity} from "../entities/auth.entity";
import {UserAuth} from "../../../../domain/models/auth.model";
import {AuthId} from "../../../../domain/value-object/auth-id.vo";
import {AuthCode} from "../../../../domain/value-object/auth-code.vo";

export class AuthMapper {
    static toDomain(entity: AuthEntity): UserAuth {
        return new UserAuth(
            AuthId.from(entity.id),
            AuthCode.from(entity.code),
            entity.expiredAt,
        )
    }

    static toPersistence(userAuth: UserAuth): AuthEntity {
        return new AuthEntity(
            userAuth.id.getValue(),
            userAuth.code.getValue(),
            userAuth.expiredAt,
        );
    }
}