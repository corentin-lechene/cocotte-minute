import {DynamicModule, Module, Type} from "@nestjs/common";
import {CreateRecipeUseCase} from "../../use-cases/create-recipe/create-recipe.use-case";
import {CreateRecipeRepository} from "../../use-cases/create-recipe/repository/create-recipe.repository";
import {RecipeFactory} from "../../domain/factories/recipe.factory";

@Module({})
export class CreateRecipeUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: CreateRecipeUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                RecipeFactory,
                {
                    provide: CreateRecipeUseCase,
                    useFactory: (repository: CreateRecipeRepository, factory: RecipeFactory) => {
                        return new CreateRecipeUseCase(repository, factory);
                    },
                    inject: [CreateRecipeRepository, RecipeFactory],
                },
            ],
            exports: [CreateRecipeUseCase],
        };
    }
}