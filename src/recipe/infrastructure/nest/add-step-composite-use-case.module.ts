import {DynamicModule, Module, Type} from '@nestjs/common';
import {AddStepCompositeUseCase} from "../../use-cases/add-step-composite/add-step-composite.use-case";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";
import {RecipeFactory} from "../../domain/factories/recipe.factory";

@Module({})
export class AddStepCompositeUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: AddStepCompositeUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                RecipeFactory,
                {
                    provide: AddStepCompositeUseCase,
                    useFactory: (recipeReadRepository: RecipeReadRepository, recipeWriteRepository: RecipeWriteRepository, recipeFactory: RecipeFactory) => {
                        return new AddStepCompositeUseCase(recipeReadRepository, recipeWriteRepository, recipeFactory);
                    },
                    inject: [RecipeReadRepository, RecipeWriteRepository, RecipeFactory],
                },
            ],
            exports: [AddStepCompositeUseCase],
        };
    }
}
