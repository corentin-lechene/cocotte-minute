import {DynamicModule, Module, Type} from '@nestjs/common';
import {AddStepUseCase} from "../../use-cases/add-step/add-step-use.case";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";
import {RecipeFactory} from "../../domain/factories/recipe.factory";

@Module({})
export class AddStepBasicUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: AddStepBasicUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                RecipeFactory,
                {
                    provide: AddStepUseCase,
                    useFactory: (recipeReadRepository: RecipeReadRepository, recipeWriteRepository: RecipeWriteRepository, recipeFactory: RecipeFactory) => {
                        return new AddStepUseCase(recipeReadRepository, recipeWriteRepository, recipeFactory);
                    },
                    inject: [RecipeReadRepository, RecipeWriteRepository, RecipeFactory],
                },
            ],
            exports: [AddStepUseCase],
        };
    }
}
