import {Module} from "@nestjs/common";
import {OrmAuthRepository} from "./repositories/orm-auth.repository";
import {AuthRepository} from "../../../domain/repository/auth.repository";

@Module({
    providers: [
        OrmAuthRepository,
        {
            provide: AuthRepository,
            useExisting: OrmAuthRepository,
        }
    ],
    exports: [
        AuthRepository,
    ]
})
export class OrmPersistenceModule {}