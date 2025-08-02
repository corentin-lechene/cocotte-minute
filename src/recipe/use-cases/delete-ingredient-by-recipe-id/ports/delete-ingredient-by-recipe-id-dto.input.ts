import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";
import {IngredientId} from "../../../domain/value-objects/ingredient-id.vo";

export class DeleteIngredientByRecipeIdInput {
  constructor(
      public readonly recipeId: RecipeId,
      public readonly ingredientId: IngredientId,
  ) {}
}
