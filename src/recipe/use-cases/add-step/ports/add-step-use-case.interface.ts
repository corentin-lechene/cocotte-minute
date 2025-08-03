import { AddStepBasicInput } from "./add-step-basic-dto.input";
import { AddStepBasicOutput } from "./add-step-basic-dto.output";

export abstract class AddStepUseCaseInterface {
  abstract execute(addStepBasicInput: AddStepBasicInput): Promise<AddStepBasicOutput>;
}
