import { AddStepBasicUseCaseInterface } from "./ports/add-step-basic-use-case.interface";
import { AddStepBasicInput } from "./ports/add-step-basic-dto.input";
import { AddStepBasicOutput } from "./ports/add-step-basic-dto.output";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeFactory} from "../../domain/factories/recipe.factory";
import {StepNotFoundError} from "../../domain/errors/step.error";

export class AddStepBasicUseCase implements AddStepBasicUseCaseInterface {
  constructor(
      private readonly recipeReadRepository: RecipeReadRepository,
      private readonly recipeWriteRepository: RecipeWriteRepository,
      private readonly recipeFactory: RecipeFactory,
  ) {}

  async execute(addStepBasicInput: AddStepBasicInput): Promise<AddStepBasicOutput> {
    const { recipeId, step: stepInput } = addStepBasicInput;

    const recipe = await this.recipeReadRepository.findById(recipeId);
    const step = this.recipeFactory.createStep(
        stepInput.description,
        stepInput.position,
        stepInput.title,
        stepInput.picture,
        stepInput.tip,
    );
    recipe.addStep(step);
    const savedRecipe = await this.recipeWriteRepository.save(recipe);
    const addedStep = savedRecipe.steps.findLast((findStep) => findStep.id.equals(step.id));
    if (!addedStep) {
      throw new StepNotFoundError(step.id.getValue());
    }

    return new AddStepBasicOutput(
        addedStep.id.getValue(),
        addedStep.description,
        addedStep.position,
        addedStep.title,
        addedStep.image,
        addedStep.tip?.getObject(),
    );
  }
}
