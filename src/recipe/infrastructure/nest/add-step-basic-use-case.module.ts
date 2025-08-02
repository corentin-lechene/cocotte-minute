import {DynamicModule, Module, Type} from '@nestjs/common';
import {AddStepBasicUseCase} from "../../use-cases/add-step-basic/add-step-basic.use-case";
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
                    provide: AddStepBasicUseCase,
                    useFactory: (recipeReadRepository: RecipeReadRepository, recipeWriteRepository: RecipeWriteRepository, recipeFactory: RecipeFactory) => {
                        return new AddStepBasicUseCase(recipeReadRepository, recipeWriteRepository, recipeFactory);
                    },
                    inject: [RecipeReadRepository, RecipeWriteRepository, RecipeFactory],
                },
            ],
            exports: [AddStepBasicUseCase],
        };
    }
}
