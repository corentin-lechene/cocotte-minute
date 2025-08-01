import { IDeleteRecipeUseCase } from "./ports/delete-recipe-use-case.interface";
import { RecipeReadRepository } from "../../domain/repository/recipe-read.repository";
import { RecipeWriteRepository } from "../../domain/repository/recipe-write.repository";
import { DeleteRecipeOutput } from "./ports/delete-recipe-dto.output";
import { DeleteRecipeInput } from "./ports/delete-recipe-dto.input";
import { UseCaseError } from "../use-case.error";

export class DeleteRecipeUseCase implements IDeleteRecipeUseCase {
  constructor(
      private readonly recipeReadRepository: RecipeReadRepository,
      private readonly recipeWriteRepository: RecipeWriteRepository,
  ) {}

  async execute(input: DeleteRecipeInput): Promise<DeleteRecipeOutput> {
    try {
      const { recipeId } = input;
      const recipe = await this.recipeReadRepository.findById(recipeId);
      await this.recipeWriteRepository.archive(recipe.id);
      return new DeleteRecipeOutput();
    } catch (error) {
      throw UseCaseError.fromError(error);
    }
  }
}
