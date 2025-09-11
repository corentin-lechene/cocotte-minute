import {Module} from "@nestjs/common";
import {InMemoryAuthRepository} from "./repositories/in-memory-auth.repository";
import {AuthRepository} from "../../../domain/repository/auth.repository";

@Module({
    providers: [
        InMemoryAuthRepository,
        {
            provide: AuthRepository,
            useExisting: InMemoryAuthRepository,
        },
    ],
    exports: [
        AuthRepository,
    ],
})
export class InMemoryPersistenceModule {}