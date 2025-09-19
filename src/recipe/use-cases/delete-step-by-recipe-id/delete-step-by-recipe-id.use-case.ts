import { DeleteStepByRecipeIdUseCaseInterface } from "./ports/delete-step-by-recipe-id-use-case.interface";
import { DeleteStepByRecipeIdInput } from "./ports/delete-step-by-recipe-id-dto.input";
import { DeleteStepByRecipeIdOutput } from "./ports/delete-step-by-recipe-id-dto.output";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";

export class DeleteStepByRecipeIdUseCase implements DeleteStepByRecipeIdUseCaseInterface {
  constructor(
      private readonly recipeReadRepository: RecipeReadRepository,
      private readonly recipeWriteRepository: RecipeWriteRepository,
  ) {}

  async execute(deleteStepByRecipeIdInput: DeleteStepByRecipeIdInput): Promise<DeleteStepByRecipeIdOutput> {
    const { recipeId, stepId } = deleteStepByRecipeIdInput;
    await this.recipeReadRepository.findById(recipeId);
    await this.recipeWriteRepository.deleteStepById(stepId);
    //todo handle position of steps after deletion
    return new DeleteStepByRecipeIdOutput();
  }
}
