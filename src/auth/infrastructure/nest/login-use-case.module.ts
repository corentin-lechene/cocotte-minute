import {DynamicModule, Module, Type} from '@nestjs/common';
import {LoginUseCase} from "../../use-cases/login/login.use-case";
import {AuthRepository} from "../../domain/repository/auth.repository";

@Module({})
export class LoginUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: LoginUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: LoginUseCase,
                    useFactory: (authRepository: AuthRepository) => {
                        return new LoginUseCase(authRepository);
                    },
                    inject: [AuthRepository],
                },
            ],
            exports: [LoginUseCase],
        };
    }
}
