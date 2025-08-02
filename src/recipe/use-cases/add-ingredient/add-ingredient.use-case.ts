import { AddIngredientUseCaseInterface } from "./ports/add-ingredient-use-case.interface";
import { AddIngredientInput } from "./ports/add-ingredient-dto.input";
import { AddIngredientOutput } from "./ports/add-ingredient-dto.output";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeFactory} from "../../domain/factories/recipe.factory";
import {RecipeIngredientNotFoundError} from "../../domain/errors/recipe.error";

export class AddIngredientUseCase implements AddIngredientUseCaseInterface {
  constructor(
      private readonly recipeReadRepository: RecipeReadRepository,
      private readonly recipeWriteRepository: RecipeWriteRepository,
      private readonly recipeFactory: RecipeFactory,
  ) {}

  async execute(addIngredientInput: AddIngredientInput): Promise<AddIngredientOutput> {
    const { recipeId, ingredient: ingredientDto } = addIngredientInput;

    const recipe = await this.recipeReadRepository.findById(recipeId);
    const ingredient = this.recipeFactory.createIngredient(ingredientDto.name, ingredientDto.unit);
    recipe.addIngredient(ingredient);
    const saveRecipe = await this.recipeWriteRepository.save(recipe);
    const addedIngredient = saveRecipe.ingredients.findLast((findIngredient) => findIngredient.id.equals(ingredient.id));
    if(!addedIngredient) {
      throw new RecipeIngredientNotFoundError(ingredient.id.getValue());
    }

    return new AddIngredientOutput(
        addedIngredient.id.getValue(),
        addedIngredient.name,
        addedIngredient.unit.getValue(),
        addedIngredient.unit.getUnit().getValue()
    );
  }
}
