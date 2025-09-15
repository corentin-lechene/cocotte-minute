import {DynamicModule, Module, Type} from '@nestjs/common';
import {LoginUseCase} from "../../use-cases/login/login.use-case";
import {AuthRepository} from "../../domain/repository/auth.repository";
import {TokenService} from "../../domain/services/token.service";

@Module({})
export class LoginUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: LoginUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: LoginUseCase,
                    useFactory: (authRepository: AuthRepository, tokenService: TokenService) => {
                        return new LoginUseCase(authRepository, tokenService);
                    },
                    inject: [AuthRepository, TokenService],
                },
            ],
            exports: [LoginUseCase],
        };
    }
}
