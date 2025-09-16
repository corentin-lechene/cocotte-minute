import { Recipe } from "../models/recipe.model";
import { RecipeId } from "../value-objects/recipe-id.vo";
import {Ingredient} from "../models/ingredient.model";
import {Step} from "../models/step.model";
import {Creator} from "../models/creator.model";

export abstract class RecipeReadRepository {
    abstract findAll(creator: Creator): Promise<Recipe[]>;
    abstract findAllByBase(creator: Creator): Promise<Recipe[]>;

    /**
     * @throws {RecipeNotFoundError} if the recipe is not found
     */
    abstract findById(recipeId: RecipeId): Promise<Recipe>;

    abstract findIngredientsByRecipeId(recipeId: RecipeId): Promise<Ingredient[]>;

    abstract findStepsByRecipeId(recipeId: RecipeId): Promise<Step[]>;
}

