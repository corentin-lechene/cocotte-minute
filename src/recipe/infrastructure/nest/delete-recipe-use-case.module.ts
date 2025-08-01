import {DynamicModule, Module, Type} from '@nestjs/common';
import {DeleteRecipeUseCase} from "../../use-cases/delete-recipe/delete-recipe.use-case";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";

@Module({})
export class DeleteRecipeUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: DeleteRecipeUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: DeleteRecipeUseCase,
                    useFactory: (findRecipeById: RecipeReadRepository, deleteRecipe: RecipeWriteRepository) => {
                        return new DeleteRecipeUseCase(
                            findRecipeById,
                            deleteRecipe,
                        );
                    },
                    inject: [RecipeReadRepository, RecipeWriteRepository],
                },
            ],
            exports: [DeleteRecipeUseCase],
        };
    }
}