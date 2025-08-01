import {Recipe} from "../../../domain/models/recipe.model";
import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";

export abstract class FindRecipeByIdRepository {
    abstract findById(recipeId: RecipeId): Promise<Recipe>;
}