import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";

export class FindAllIngredientsByIdInput {
  constructor(public readonly recipeId: RecipeId) {}
}
