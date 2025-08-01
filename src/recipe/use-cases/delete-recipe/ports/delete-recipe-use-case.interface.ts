import { DeleteRecipeInput } from "./delete-recipe-dto.input";
import { DeleteRecipeOutput } from "./delete-recipe-dto.output";

export abstract class IDeleteRecipeUseCase {
  abstract execute(input: DeleteRecipeInput): Promise<DeleteRecipeOutput>;
}
