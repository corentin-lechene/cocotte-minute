import {Recipe} from "../../../../domain/recipe/recipe.model";
import {RecipeId} from "../../../../domain/recipe/value-objects/recipe-id.vo";

export abstract class FindRecipeByIdRepository {
    abstract findById(recipeId: RecipeId): Promise<Recipe>;
}