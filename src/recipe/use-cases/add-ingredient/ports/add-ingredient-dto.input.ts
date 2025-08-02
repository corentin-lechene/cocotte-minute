import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";
import {IngredientUnit} from "../../../domain/value-objects/ingredient-unit.vo";

type IngredientDto = {
  name: string;
  unit: IngredientUnit;
}

export class AddIngredientInput {
  constructor(
      public readonly recipeId: RecipeId,
      public readonly ingredient: IngredientDto,
  ) {}
}
