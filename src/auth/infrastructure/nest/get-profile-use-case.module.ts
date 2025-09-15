import {DynamicModule, Module, Type} from '@nestjs/common';
import {GetProfileUseCase} from "../../use-cases/get-profile/get-profile.use-case";
import {AuthRepository} from "../../domain/repository/auth.repository";

@Module({})
export class GetProfileUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: GetProfileUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: GetProfileUseCase,
                    useFactory: (authRepository: AuthRepository) => {
                        return new GetProfileUseCase(authRepository);
                    },
                    inject: [AuthRepository],
                },
            ],
            exports: [GetProfileUseCase],
        };
    }
}
