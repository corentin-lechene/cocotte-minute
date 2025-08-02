import { DeleteIngredientByRecipeIdUseCaseInterface } from "./ports/delete-ingredient-by-recipe-id-use-case.interface";
import { DeleteIngredientByRecipeIdInput } from "./ports/delete-ingredient-by-recipe-id-dto.input";
import { DeleteIngredientByRecipeIdOutput } from "./ports/delete-ingredient-by-recipe-id-dto.output";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";

export class DeleteIngredientByRecipeIdUseCase implements DeleteIngredientByRecipeIdUseCaseInterface {
  constructor(
      private readonly recipeReadRepository: RecipeReadRepository,
      private readonly recipeWriteRepository: RecipeWriteRepository,
  ) {}

  async execute(deleteIngredientByRecipeIdInput: DeleteIngredientByRecipeIdInput): Promise<DeleteIngredientByRecipeIdOutput> {
    const { recipeId, ingredientId } = deleteIngredientByRecipeIdInput;
    await this.recipeReadRepository.findById(recipeId);
    await this.recipeWriteRepository.deleteIngredientById(ingredientId);
    return new DeleteIngredientByRecipeIdOutput();
  }
}
