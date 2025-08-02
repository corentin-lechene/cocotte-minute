import {DynamicModule, Module, Type} from '@nestjs/common';
import {FindStepsByRecipeIdUseCase} from "../../use-cases/find-steps-by-recipe-id/find-steps-by-recipe-id.use-case";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";

@Module({})
export class FindStepsByRecipeIdUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: FindStepsByRecipeIdUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                {
                    provide: FindStepsByRecipeIdUseCase,
                    useFactory: (recipeReadRepository: RecipeReadRepository) => {
                        return new FindStepsByRecipeIdUseCase(recipeReadRepository);
                    },
                    inject: [RecipeReadRepository],
                },
            ],
            exports: [FindStepsByRecipeIdUseCase],
        };
    }
}
