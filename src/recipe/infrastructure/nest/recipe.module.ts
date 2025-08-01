import { DynamicModule, Module, Type } from '@nestjs/common';
import { RecipeController } from '../../presenters/http/recipes/recipe.controller';
import { FindRecipesUseCaseModule } from "./recipes/find-recipes-use-case.module";
import { CreateRecipeUseCaseModule } from "./recipes/create-recipe-use-case.module";
import {DeleteRecipeUseCaseModule} from "./recipes/delete-recipe-use-case.module";

@Module({})
export class RecipeModule {
    static withInfrastructure(infrastructureModule: Type | DynamicModule): DynamicModule {
        return {
            module: RecipeModule,
            imports: [
                infrastructureModule,
                FindRecipesUseCaseModule.use(infrastructureModule),
                CreateRecipeUseCaseModule.use(infrastructureModule),
                DeleteRecipeUseCaseModule.use(infrastructureModule),
            ],
            controllers: [RecipeController],
            providers: [],
            exports: [infrastructureModule],
        };
    }
}