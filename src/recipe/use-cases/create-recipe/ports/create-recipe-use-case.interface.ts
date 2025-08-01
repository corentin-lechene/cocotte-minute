import {CreateRecipeInput} from "./create-recipe-dto.input";
import {CreateRecipeOutput} from "./create-recipe-dto.output";

export abstract class CreateRecipeUseCaseInterface {
    abstract execute(createRecipeRequest: CreateRecipeInput): Promise<CreateRecipeOutput>;
}