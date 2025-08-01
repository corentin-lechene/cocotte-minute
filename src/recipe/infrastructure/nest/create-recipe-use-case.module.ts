import {DynamicModule, Module, Type} from "@nestjs/common";
import {CreateRecipeUseCase} from "../../use-cases/create-recipe/create-recipe.use-case";
import {RecipeFactory} from "../../domain/factories/recipe.factory";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";

@Module({})
export class CreateRecipeUseCaseModule {
    static use(infrastructureModule: Type | DynamicModule) {
        return {
            module: CreateRecipeUseCaseModule,
            imports: [infrastructureModule],
            providers: [
                RecipeFactory,
                {
                    provide: CreateRecipeUseCase,
                    useFactory: (repository: RecipeWriteRepository, factory: RecipeFactory) => {
                        return new CreateRecipeUseCase(repository, factory);
                    },
                    inject: [RecipeWriteRepository, RecipeFactory],
                },
            ],
            exports: [CreateRecipeUseCase],
        };
    }
}