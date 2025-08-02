import { Recipe } from "../models/recipe.model";
import { RecipeId } from "../value-objects/recipe-id.vo";
import {Ingredient} from "../models/ingredient.model";

export abstract class RecipeReadRepository {
    abstract findAll(): Promise<Recipe[]>;

    /**
     * @throws {RecipeNotFoundError} if the recipe is not found
     */
    abstract findById(recipeId: RecipeId): Promise<Recipe>;

    abstract findIngredientsByRecipeId(recipeId: RecipeId): Promise<Ingredient[]>;
}

