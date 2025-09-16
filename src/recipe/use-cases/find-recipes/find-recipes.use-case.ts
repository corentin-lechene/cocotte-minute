import {IFindRecipesUseCase} from "./ports/find-recipes-use-case.interface";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {UseCaseError} from "../use-case.error";
import {FindRecipesOutput} from "./ports/find-recipes-dto.output";
import {FindRecipesInput} from "./ports/find-recipes-dto.input";
import {ExecutionContextUser} from "../../../common/interfaces/execution-context-user.interface";
import {Creator} from "../../domain/models/creator.model";

export class FindRecipesUseCase implements IFindRecipesUseCase {
    constructor(private readonly recipeReadRepository: RecipeReadRepository) {
    }

    async execute(findRecipesInput: FindRecipesInput, executionContextUser: ExecutionContextUser): Promise<FindRecipesOutput> {
        try {
            const {isRecipeBase} = findRecipesInput;
            const {actor} = executionContextUser;

            if (isRecipeBase !== undefined) {
                const allRecipes = await this.recipeReadRepository.findAllByBase(Creator.fromActor(actor));
                return new FindRecipesOutput(allRecipes.map((recipe) => ({
                    id: recipe.id.getValue(),
                    name: recipe.name,
                    picture: recipe.picture,
                    isRecipeBase: recipe.isBase,
                })));
            }
            const allRecipes = await this.recipeReadRepository.findAll(Creator.fromActor(actor));
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