import { FindAllIngredientsByIdUseCaseInterface } from "./ports/find-all-ingredients-by-id-use-case.interface";
import { FindAllIngredientsByIdInput } from "./ports/find-all-ingredients-by-id-dto.input";
import { FindAllIngredientsByIdOutput } from "./ports/find-all-ingredients-by-id-dto.output";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";

export class FindIngredientsByRecipeIdUseCase implements FindAllIngredientsByIdUseCaseInterface {
  constructor(private readonly recipeReadRepository: RecipeReadRepository) {}

  async execute(findAllIngredientsByIdInput: FindAllIngredientsByIdInput): Promise<FindAllIngredientsByIdOutput> {
    const { recipeId } = findAllIngredientsByIdInput;
    const ingredients = await this.recipeReadRepository.findIngredientsByRecipeId(recipeId);
    return new FindAllIngredientsByIdOutput(ingredients.map((ingredient) => ({
        id: ingredient.id.getValue(),
        name: ingredient.name,
        unit: ingredient.unit.getUnit().getValue(),
        quantity: ingredient.unit.getValue(),
    })));
  }
}
