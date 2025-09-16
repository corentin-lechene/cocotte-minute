import {FindRecipesOutput} from "./find-recipes-dto.output";
import {FindRecipesInput} from "./find-recipes-dto.input";
import {ExecutionContextUser} from "../../../../common/interfaces/execution-context-user.interface";

export abstract class IFindRecipesUseCase {
    abstract execute(findRecipesInput: FindRecipesInput, executionContextUser: ExecutionContextUser): Promise<FindRecipesOutput>;
}