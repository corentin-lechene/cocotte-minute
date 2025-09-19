import {DynamicModule, Module, Type} from '@nestjs/common';
import {DeleteStepByRecipeIdUseCase} from "../../use-cases/delete-step-by-recipe-id/delete-step-by-recipe-id.use-case";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";

@Module({})
export class DeleteStepByRecipeIdUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: DeleteStepByRecipeIdUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: DeleteStepByRecipeIdUseCase,
                    useFactory: (recipeReadRepository: RecipeReadRepository, recipeWriteRepository: RecipeWriteRepository) => {
                        return new DeleteStepByRecipeIdUseCase(recipeReadRepository, recipeWriteRepository);
                    },
                    inject: [RecipeReadRepository, RecipeWriteRepository],
                },
            ],
            exports: [DeleteStepByRecipeIdUseCase],
        };
    }
}
