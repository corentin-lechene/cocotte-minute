import {RecipeId} from "../../../domain/recipe/value-objects/recipe-id.vo";

export class DeleteRecipeInput {
  constructor(public recipeId: RecipeId) {}
}
