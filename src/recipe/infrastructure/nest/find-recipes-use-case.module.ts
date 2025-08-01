import {DynamicModule, Module, Type} from '@nestjs/common';
import {FindRecipesUseCase} from "../../use-cases/find-recipes/find-recipes.use-case";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";

@Module({})
export class FindRecipesUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: FindRecipesUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: FindRecipesUseCase,
                    useFactory: (repository: RecipeReadRepository) => {
                        return new FindRecipesUseCase(repository);
                    },
                    inject: [RecipeReadRepository],
                },
            ],
            exports: [FindRecipesUseCase],
        };
    }
}