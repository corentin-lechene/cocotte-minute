import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";
import {StepId} from "../../../domain/value-objects/step-id.vo";

export class DeleteStepByRecipeIdInput {
  constructor(
      public readonly recipeId: RecipeId,
      public readonly stepId: StepId,
  ) {}
}
