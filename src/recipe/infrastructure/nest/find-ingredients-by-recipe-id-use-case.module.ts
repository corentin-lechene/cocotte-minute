import {DynamicModule, Module, Type} from '@nestjs/common';
import {FindIngredientsByRecipeIdUseCase} from "../../use-cases/find-all-ingredients-by-id/find-ingredients-by-recipe-id-use.case";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";

@Module({})
export class FindIngredientsByRecipeIdUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: FindIngredientsByRecipeIdUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: FindIngredientsByRecipeIdUseCase,
                    useFactory: (recipeReadRepository: RecipeReadRepository) => {
                        return new FindIngredientsByRecipeIdUseCase(recipeReadRepository);
                    },
                    inject: [RecipeReadRepository],
                },
            ],
            exports: [FindIngredientsByRecipeIdUseCase],
        };
    }
}
