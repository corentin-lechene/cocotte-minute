import { Recipe } from "../models/recipe.model";
import { RecipeId } from "../value-objects/recipe-id.vo";
import {IngredientId} from "../value-objects/ingredient-id.vo";

export abstract class RecipeWriteRepository {
    abstract create(recipe: Recipe): Promise<Recipe>;
    abstract save(recipe: Recipe): Promise<Recipe>;
    abstract archive(recipeId: RecipeId): Promise<Recipe[]>;
    abstract deleteIngredientById(ingredientId: IngredientId): Promise<void>;
}
