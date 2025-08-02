import { Recipe } from "../models/recipe.model";
import { RecipeId } from "../value-objects/recipe-id.vo";

export abstract class RecipeReadRepository {
    abstract findAll(): Promise<Recipe[]>;

    /**
     * @throws {RecipeNotFoundError} if the recipe is not found
     */
    abstract findById(recipeId: RecipeId): Promise<Recipe>;
}

