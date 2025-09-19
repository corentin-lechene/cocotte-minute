import { DeleteStepByRecipeIdInput } from "./delete-step-by-recipe-id-dto.input";
import { DeleteStepByRecipeIdOutput } from "./delete-step-by-recipe-id-dto.output";

export abstract class DeleteStepByRecipeIdUseCaseInterface {
  abstract execute(deleteStepByRecipeIdInput: DeleteStepByRecipeIdInput): Promise<DeleteStepByRecipeIdOutput>;
}
