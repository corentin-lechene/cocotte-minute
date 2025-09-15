import { DynamicModule, Module, Type } from '@nestjs/common';
import { AuthController } from '../../presenters/http/auth.controller';
import {LoginUseCaseModule} from "./login-use-case.module";
import {GetProfileUseCaseModule} from "./get-profile-use-case.module";

@Module({})
export class AuthModule {
    static withInfrastructure(infrastructureModule: Type | DynamicModule): DynamicModule {
        return {
            module: AuthModule,
            imports: [
                infrastructureModule,
                LoginUseCaseModule.use(infrastructureModule),
                GetProfileUseCaseModule.use(infrastructureModule),
            ],
            controllers: [AuthController],
            providers: [],
            exports: [infrastructureModule],
        };
    }
}