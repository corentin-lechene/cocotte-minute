import { DynamicModule, Module } from '@nestjs/common';
import {InMemoryPersistenceModule} from "./persistence/in-memory/in-memory-persistence.module";
import {AppDriverType} from "../../common/interfaces/application-bootstrap-options.interface";

@Module({})
export class AuthInfrastructureModule {
    static use(driver: AppDriverType): DynamicModule {
        const persistenceModule = InMemoryPersistenceModule;

        return {
            module: AuthInfrastructureModule,
            imports: [persistenceModule],
            exports: [persistenceModule],
        };
    }
}
