import { FindStepsByRecipeIdInput } from "./find-steps-by-recipe-id-dto.input";
import { FindStepsByRecipeIdOutput } from "./find-steps-by-recipe-id-dto.output";

export abstract class FindStepsByRecipeIdUseCaseInterface {
  abstract execute(findStepsByRecipeIdInput: FindStepsByRecipeIdInput): Promise<FindStepsByRecipeIdOutput>;
}
