import { DynamicModule, Module, Type } from '@nestjs/common';
import { RecipeController } from '../../presenters/http/recipe.controller';
import { FindRecipesUseCaseModule } from "./find-recipes-use-case.module";
import { CreateRecipeUseCaseModule } from "./create-recipe-use-case.module";
import {DeleteRecipeUseCaseModule} from "./delete-recipe-use-case.module";
import {AddIngredientUseCaseModule} from "./add-ingredient-use-case.module";
import {FindIngredientsByRecipeIdUseCaseModule} from "./find-ingredients-by-recipe-id-use-case.module";
import {DeleteIngredientByRecipeIdUseCaseModule} from "./delete-ingredient-by-recipe-id-use-case.module";
import {FindStepsByRecipeIdUseCaseModule} from "./find-steps-by-recipe-id-use-case.module";
import {AddStepBasicUseCaseModule} from "./add-step-basic-use-case.module";
import {AddStepCompositeUseCaseModule} from "./add-step-composite-use-case.module";
import {AuthModule} from "../../../auth/infrastructure/nest/auth.module";
import {AuthInfrastructureModule} from "../../../auth/infrastructure/auth-infrastructure.module";
import {DeleteStepByRecipeIdUseCaseModule} from "./delete-step-by-recipe-id-use-case.module";

@Module({})
export class RecipeModule {
    static withInfrastructure(infrastructureModule: Type | DynamicModule): DynamicModule {
        return {
            module: RecipeModule,
            imports: [
                infrastructureModule,
                AuthModule.withInfrastructure(AuthInfrastructureModule.use('in-memory')), //todo: remove this
                FindRecipesUseCaseModule.use(infrastructureModule),
                CreateRecipeUseCaseModule.use(infrastructureModule),
                DeleteRecipeUseCaseModule.use(infrastructureModule),
                AddIngredientUseCaseModule.use(infrastructureModule),
                FindIngredientsByRecipeIdUseCaseModule.use(infrastructureModule),
                DeleteIngredientByRecipeIdUseCaseModule.use(infrastructureModule),
                FindStepsByRecipeIdUseCaseModule.use(infrastructureModule),
                AddStepBasicUseCaseModule.use(infrastructureModule),
                AddStepCompositeUseCaseModule.use(infrastructureModule),
                DeleteStepByRecipeIdUseCaseModule.use(infrastructureModule),
            ],
            controllers: [RecipeController],
            providers: [],
            exports: [infrastructureModule],
        };
    }
}