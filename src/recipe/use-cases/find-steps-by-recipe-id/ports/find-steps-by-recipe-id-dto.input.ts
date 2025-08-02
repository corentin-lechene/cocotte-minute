import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";

export class FindStepsByRecipeIdInput {
  constructor(public readonly recipeId: RecipeId) {}
}
