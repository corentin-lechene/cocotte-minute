import { Recipe } from "../../../domain/models/recipe.model";
import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";

export abstract class DeleteRecipeRepository {
  abstract archive(recipeId: RecipeId): Promise<Recipe[]>;
}
