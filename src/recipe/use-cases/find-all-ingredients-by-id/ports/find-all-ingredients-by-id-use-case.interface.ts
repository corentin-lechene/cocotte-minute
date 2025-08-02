import { FindAllIngredientsByIdInput } from "./find-all-ingredients-by-id-dto.input";
import { FindAllIngredientsByIdOutput } from "./find-all-ingredients-by-id-dto.output";

export abstract class FindAllIngredientsByIdUseCaseInterface {
  abstract execute(findAllIngredientsByIdInput: FindAllIngredientsByIdInput): Promise<FindAllIngredientsByIdOutput>;
}
