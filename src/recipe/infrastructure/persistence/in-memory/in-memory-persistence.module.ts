import {Module} from "@nestjs/common";
import {InMemoryRecipeRepository} from "./repositories/in-memory-recipe.repository";
import {FindRecipesRepository} from "../../../use-cases/recipes/find-recipes/repository/find-recipes.repository";
import {CreateRecipeRepository} from "../../../use-cases/recipes/create-recipe/repository/create-recipe.repository";

@Module({
    providers: [
        InMemoryRecipeRepository,
        {
            provide: FindRecipesRepository,
            useExisting: InMemoryRecipeRepository,
        },
        {
            provide: CreateRecipeRepository,
            useExisting: InMemoryRecipeRepository,
        }
    ],
    exports: [
        FindRecipesRepository,
        CreateRecipeRepository,
    ],
})
export class InMemoryPersistenceModule {}