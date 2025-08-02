import {DynamicModule, Module, Type} from '@nestjs/common';
import {AddIngredientUseCase} from "../../use-cases/add-ingredient/add-ingredient.use-case";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";
import {RecipeFactory} from "../../domain/factories/recipe.factory";

@Module({})
export class AddIngredientUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: AddIngredientUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                RecipeFactory,
                {
                    provide: AddIngredientUseCase,
                    useFactory: (recipeReadRepository: RecipeReadRepository, recipeWriteRepository: RecipeWriteRepository, recipeFactory: RecipeFactory) => {
                        return new AddIngredientUseCase(
                            recipeReadRepository,
                            recipeWriteRepository,
                            recipeFactory,
                        );
                    },
                    inject: [RecipeReadRepository, RecipeWriteRepository, RecipeFactory],
                },
            ],
            exports: [AddIngredientUseCase],
        };
    }
}
