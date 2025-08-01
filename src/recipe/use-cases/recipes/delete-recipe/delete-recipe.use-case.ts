import { IDeleteRecipeUseCase } from "./ports/delete-recipe-use-case.interface";
import { DeleteRecipeRepository } from "./repository/delete-recipe.repository";
import { FindRecipeByIdRepository } from "./repository/find-recipe-by-id.repository";
import { DeleteRecipeOutput } from "./ports/delete-recipe-dto.output";
import { DeleteRecipeInput } from "./ports/delete-recipe-dto.input";
import { UseCaseError } from "../../use-case.error";

export class DeleteRecipeUseCase implements IDeleteRecipeUseCase {
  constructor(
      private readonly findRecipeRepository: FindRecipeByIdRepository,
      private readonly deleteRecipeRepository: DeleteRecipeRepository,
  ) {}

  async execute(input: DeleteRecipeInput): Promise<DeleteRecipeOutput> {
    try {
      const { recipeId } = input;
      const recipe = await this.findRecipeRepository.findById(recipeId);
      await this.deleteRecipeRepository.archive(recipe.id);
      return new DeleteRecipeOutput();
    } catch (error) {
      throw UseCaseError.fromError(error);
    }
  }
}
