import { DynamicModule, Module, Type } from '@nestjs/common';
import { AuthController } from '../../presenters/http/auth.controller';
import {LoginUseCaseModule} from "./login-use-case.module";
import {GetProfileUseCaseModule} from "./get-profile-use-case.module";
import {ExecutionContextUserGuard} from "./guards/execution-context-user.guard";

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
            providers: [
                ExecutionContextUserGuard
            ],
            exports: [infrastructureModule, ExecutionContextUserGuard],
        };
    }
}