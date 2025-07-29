import { DynamicModule, Module } from '@nestjs/common';
import {ApplicationBootstrapOptions} from "../common/interfaces/application-bootstrap-options.interface";

@Module({})
export class CoreModule {
    static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
        const imports =
            options.driver === 'orm'
                ? [] //define orm
                : [];
        return {
            module: CoreModule,
            imports,
        };
    }
}
