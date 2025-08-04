import { AddStepCompositeInput } from "./add-step-composite-dto.input";
import { AddStepCompositeOutput } from "./add-step-composite-dto.output";

export abstract class AddStepCompositeUseCaseInterface {
  abstract execute(addStepCompositeInput: AddStepCompositeInput): Promise<AddStepCompositeOutput>;
}
