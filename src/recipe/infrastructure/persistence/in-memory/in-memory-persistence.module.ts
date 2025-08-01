import {Module} from "@nestjs/common";
import {InMemoryRecipeRepository} from "./repositories/in-memory-recipe.repository";
import {FindRecipesRepository} from "../../../use-cases/find-recipes/repository/find-recipes.repository";
import {CreateRecipeRepository} from "../../../use-cases/create-recipe/repository/create-recipe.repository";
import {DeleteRecipeRepository} from "../../../use-cases/recipes/delete-recipe/repository/delete-recipe.repository";
import {
    FindRecipeByIdRepository
} from "../../../use-cases/recipes/delete-recipe/repository/find-recipe-by-id.repository";

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
        },
        {
            provide: DeleteRecipeRepository,
            useExisting: InMemoryRecipeRepository,
        },
        {
            provide: FindRecipeByIdRepository,
            useExisting: InMemoryRecipeRepository,
        },
    ],
    exports: [
        FindRecipesRepository,
        CreateRecipeRepository,
        DeleteRecipeRepository,
        FindRecipeByIdRepository,
    ],
})
export class InMemoryPersistenceModule {}