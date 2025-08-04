import {IFindRecipesUseCase} from "./ports/find-recipes-use-case.interface";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {UseCaseError} from "../use-case.error";
import {FindRecipesOutput} from "./ports/find-recipes-dto.output";
import {FindRecipesInput} from "./ports/find-recipes-dto.input";

export class FindRecipesUseCase implements IFindRecipesUseCase {
    constructor(private readonly recipeReadRepository: RecipeReadRepository) {
    }

    async execute(findRecipesInput: FindRecipesInput): Promise<FindRecipesOutput> {
        try {
            const {isRecipeBase} = findRecipesInput;
            if (isRecipeBase !== undefined) {
                const allRecipes = await this.recipeReadRepository.findAllByBase();
                return new FindRecipesOutput(allRecipes.map((recipe) => ({
                    id: recipe.id.getValue(),
                    name: recipe.name,
                    picture: recipe.picture,
                    isRecipeBase: recipe.isBase,
                })));
            }
            const allRecipes = await this.recipeReadRepository.findAll();
            return new FindRecipesOutput(allRecipes.map((recipe) => ({
                id: recipe.id.getValue(),
                name: recipe.name,
                picture: recipe.picture,
                isRecipeBase: recipe.isBase,
            })));
        } catch (error) {
            throw UseCaseError.fromError(error);
        }
    }
}