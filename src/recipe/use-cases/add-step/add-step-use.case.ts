import { AddStepUseCaseInterface } from "./ports/add-step-use-case.interface";
import { AddStepBasicInput } from "./ports/add-step-basic-dto.input";
import { AddStepBasicOutput } from "./ports/add-step-basic-dto.output";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeFactory} from "../../domain/factories/recipe.factory";
import {StepNotFoundError} from "../../domain/errors/step.error";

export class AddStepUseCase implements AddStepUseCaseInterface {
  constructor(
      private readonly recipeReadRepository: RecipeReadRepository,
      private readonly recipeWriteRepository: RecipeWriteRepository,
      private readonly recipeFactory: RecipeFactory,
  ) {}

  async execute(addStepBasicInput: AddStepBasicInput): Promise<AddStepBasicOutput> {
    const { recipeId, step: stepInput } = addStepBasicInput;

    const recipe = await this.recipeReadRepository.findById(recipeId);
    const stepBasic = this.recipeFactory.createStep(recipe.steps.length + 1, stepInput.description);
    recipe.addStep(stepBasic);
    const savedRecipe = await this.recipeWriteRepository.save(recipe);
    const addedStep = savedRecipe.steps.findLast((findStep) => findStep.id.equals(stepBasic.id));
    if (!addedStep) {
      throw new StepNotFoundError(stepBasic.id.getValue());
    }

    return new AddStepBasicOutput(
        addedStep.id.getValue(),
        addedStep.position,
        addedStep.type,
        addedStep.description,
    );
  }
}
