import {IFindRecipesUseCase} from "./ports/find-recipes-use-case.interface";
import {FindRecipesRepository} from "./repository/find-recipes.repository";
import {Injectable} from "@nestjs/common";
import {RecipeNotFoundError} from "../../domain/errors/recipe.error";
import {UseCaseError} from "../use-case.error";
import {FindRecipesOutput} from "./ports/find-recipes-dto.output";
import {FindRecipesInput} from "./ports/find-recipes-dto.input";

export class FindRecipesUseCase implements IFindRecipesUseCase {
  constructor(private readonly recipeRepository: FindRecipesRepository) {}

  async execute(findRecipesInput: FindRecipesInput): Promise<FindRecipesOutput> {
    try {
      const allRecipes = await this.recipeRepository.findAll();
      return new FindRecipesOutput(allRecipes.map((recipe) => ({
        id: recipe.id.getValue(),
        name: recipe.name,
        picture: recipe.picture,
      })));
    } catch (error) {
      throw UseCaseError.fromError(error);
    }
  }
}