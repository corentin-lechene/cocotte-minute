import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";

export class DeleteRecipeInput {
  constructor(public recipeId: RecipeId) {}
}
