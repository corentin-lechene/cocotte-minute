import {CreateRecipeInput} from "./create-recipe-dto.input";
import {CreateRecipeOutput} from "./create-recipe-dto.output";
import {ExecutionContextUser} from "../../../../common/interfaces/execution-context-user.interface";

export abstract class CreateRecipeUseCaseInterface {
    abstract execute(createRecipeRequest: CreateRecipeInput, executionContextUser: ExecutionContextUser): Promise<CreateRecipeOutput>;
}