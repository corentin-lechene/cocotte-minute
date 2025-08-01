import {DynamicModule, Module, Type} from '@nestjs/common';
import {DeleteRecipeUseCase} from "../../../use-cases/delete-recipe/delete-recipe.use-case";
import {
    FindRecipeByIdRepository
} from "../../../use-cases/delete-recipe/repository/find-recipe-by-id.repository";
import {DeleteRecipeRepository} from "../../../use-cases/delete-recipe/repository/delete-recipe.repository";

@Module({})
export class DeleteRecipeUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: DeleteRecipeUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: DeleteRecipeUseCase,
                    useFactory: (findRecipeById: FindRecipeByIdRepository, deleteRecipe: DeleteRecipeRepository) => {
                        return new DeleteRecipeUseCase(
                            findRecipeById,
                            deleteRecipe,
                        );
                    },
                    inject: [FindRecipeByIdRepository, DeleteRecipeRepository],
                },
            ],
            exports: [DeleteRecipeUseCase],
        };
    }
}