import {FindRecipesOutput} from "./find-recipes-dto.output";
import {FindRecipesInput} from "./find-recipes-dto.input";

export abstract class IFindRecipesUseCase {
    abstract execute(findRecipesInput: FindRecipesInput): Promise<FindRecipesOutput>;
}