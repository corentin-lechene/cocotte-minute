import { DynamicModule, Module } from '@nestjs/common';
import {InMemoryPersistenceModule} from "./persistence/in-memory/in-memory-persistence.module";
import {AppDriverType} from "../../common/interfaces/application-bootstrap-options.interface";
import {OrmPersistenceModule} from "./persistence/orm/orm-persistence.module";

@Module({})
export class RecipeInfrastructureModule {
    static use(driver: AppDriverType): DynamicModule {
        const persistenceModule = driver === 'orm'
        ? OrmPersistenceModule
        : InMemoryPersistenceModule;

        return {
            module: RecipeInfrastructureModule,
            imports: [persistenceModule],
            exports: [persistenceModule],
        };
    }
}
