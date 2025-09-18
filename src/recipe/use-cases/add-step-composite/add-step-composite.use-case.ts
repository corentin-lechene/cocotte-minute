import {AddStepCompositeUseCaseInterface} from "./ports/add-step-composite-use-case.interface";
import {AddStepCompositeInput} from "./ports/add-step-composite-dto.input";
import {AddStepCompositeOutput} from "./ports/add-step-composite-dto.output";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";
import {RecipeFactory} from "../../domain/factories/recipe.factory";
import {StepNotFoundError} from "../../domain/errors/step.error";

export class AddStepCompositeUseCase implements AddStepCompositeUseCaseInterface {
    constructor(
        private readonly recipeReadRepository: RecipeReadRepository,
        private readonly recipeWriteRepository: RecipeWriteRepository,
        private readonly recipeFactory: RecipeFactory,
    ) {
    }

    async execute(addStepCompositeInput: AddStepCompositeInput): Promise<AddStepCompositeOutput> {
        const {recipeId, step} = addStepCompositeInput;

        const recipe = await this.recipeReadRepository.findById(recipeId);
        const subRecipe = await this.recipeReadRepository.findById(step.subRecipeId);
        const position = recipe.steps.length + 1; //todo handle position from input if needed
        const stepComposite = this.recipeFactory.createStepSubRecipe(position, step.description, subRecipe);
        recipe.addStep(stepComposite);
        const savedRecipe = await this.recipeWriteRepository.save(recipe);
        const addedStep = savedRecipe.steps.findLast((findStep) => findStep.id.equals(stepComposite.id));
        if (!addedStep) {
            throw new StepNotFoundError(stepComposite.id.getValue());
        }
        return new AddStepCompositeOutput(
            addedStep.id.getValue(),
            addedStep.position,
            addedStep.type,
            addedStep.description,
            {
                id: addedStep.id.getValue(),
                name: addedStep.subRecipe?.name || "",
                steps: addedStep.subRecipe?.steps?.map((subStep) => ({
                    id: subStep.id.getValue(),
                    position: subStep.position,
                    type: subStep.type,
                    description: subStep.description,
                    subRecipe: {
                        id: subStep.subRecipe?.id.getValue() || "",
                        name: subStep.subRecipe?.name || "",
                        steps: [], //todo handle sub-recipe steps if needed
                    },
                })) || [],
            }
        );
    }
}
