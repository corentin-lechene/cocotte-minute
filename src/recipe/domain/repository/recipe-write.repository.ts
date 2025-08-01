import { Recipe } from "../models/recipe.model";
import { RecipeId } from "../value-objects/recipe-id.vo";

export abstract class RecipeWriteRepository {
    abstract create(recipe: Recipe): Promise<Recipe>;
    abstract archive(recipeId: RecipeId): Promise<Recipe[]>;
}

