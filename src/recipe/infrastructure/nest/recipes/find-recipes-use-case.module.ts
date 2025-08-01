import {DynamicModule, Module, Type} from '@nestjs/common';
import {FindRecipesRepository} from "../../../use-cases/find-recipes/repository/find-recipes.repository";
import {FindRecipesUseCase} from "../../../use-cases/find-recipes/find-recipes.use-case";

@Module({})
export class FindRecipesUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: FindRecipesUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: FindRecipesUseCase,
                    useFactory: (repository: FindRecipesRepository) => {
                        return new FindRecipesUseCase(repository);
                    },
                    inject: [FindRecipesRepository],
                },
            ],
            exports: [FindRecipesUseCase],
        };
    }
}