import { DeleteIngredientByRecipeIdInput } from "./delete-ingredient-by-recipe-id-dto.input";
import { DeleteIngredientByRecipeIdOutput } from "./delete-ingredient-by-recipe-id-dto.output";

export abstract class DeleteIngredientByRecipeIdUseCaseInterface {
  abstract execute(deleteIngredientByRecipeIdInput: DeleteIngredientByRecipeIdInput): Promise<DeleteIngredientByRecipeIdOutput>;
}
