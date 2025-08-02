import { AddIngredientInput } from "./add-ingredient-dto.input";
import { AddIngredientOutput } from "./add-ingredient-dto.output";

export abstract class AddIngredientUseCaseInterface {
  abstract execute(addIngredientInput: AddIngredientInput): Promise<AddIngredientOutput>;
}
