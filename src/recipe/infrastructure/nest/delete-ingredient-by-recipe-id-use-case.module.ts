import {DynamicModule, Module, Type} from '@nestjs/common';
import {DeleteIngredientByRecipeIdUseCase} from "../../use-cases/delete-ingredient-by-recipe-id/delete-ingredient-by-recipe-id.use-case";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";

@Module({})
export class DeleteIngredientByRecipeIdUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: DeleteIngredientByRecipeIdUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: DeleteIngredientByRecipeIdUseCase,
                    useFactory: (recipeReadRepository: RecipeReadRepository, recipeWriteRepository: RecipeWriteRepository) => {
                        return new DeleteIngredientByRecipeIdUseCase(recipeReadRepository, recipeWriteRepository);
                    },
                    inject: [RecipeReadRepository, RecipeWriteRepository],
                },
            ],
            exports: [DeleteIngredientByRecipeIdUseCase],
        };
    }
}
